import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { buildPublicFileUrl } from '../common/file-url.util';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { nombre: dto.nombre.trim() },
    });

    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con ese nombre');
    }

    const user = this.usersRepository.create({
      nombre: dto.nombre.trim(),
      password_hash: await hash(dto.password, 10),
      image_url: null,
    });

    const savedUser = await this.usersRepository.save(user);
    return this.toPublicUser(savedUser);
  }

  async findEntityById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} no existe`);
    }
    return user;
  }

  async findByNombreWithPassword(nombre: string) {
    const normalizedName = nombre.trim();
    return this.usersRepository.findOne({ where: { nombre: normalizedName } });
  }

  async validateCredentials(nombre: string, password: string) {
    const user = await this.findByNombreWithPassword(nombre);
    if (!user) {
      return null;
    }

    const isValidPassword = await compare(password, user.password_hash);
    return isValidPassword ? user : null;
  }

  async getProfile(id: number) {
    const user = await this.findEntityById(id);
    return this.toPublicUser(user);
  }

  async updateProfile(id: number, dto: UpdateUserDto) {
    const user = await this.findEntityById(id);

    if (dto.nombre && dto.nombre.trim() !== user.nombre) {
      const userWithSameName = await this.usersRepository.findOne({
        where: { nombre: dto.nombre.trim() },
      });
      if (userWithSameName && userWithSameName.id !== id) {
        throw new ConflictException('Ya existe un usuario con ese nombre');
      }
      user.nombre = dto.nombre.trim();
    }

    const updatedUser = await this.usersRepository.save(user);
    return this.toPublicUser(updatedUser);
  }

  async attachImage(id: number, fileName: string) {
    const user = await this.findEntityById(id);
    const appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');
    user.image_url = buildPublicFileUrl(appUrl, fileName);
    const updatedUser = await this.usersRepository.save(user);
    return this.toPublicUser(updatedUser);
  }

  toPublicUser(user: User) {
    return {
      id: user.id,
      nombre: user.nombre,
      image_url: user.image_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}