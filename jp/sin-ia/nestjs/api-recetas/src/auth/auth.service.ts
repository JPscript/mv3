import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthUserPayload } from './interfaces/auth-user-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.usersService.create(dto);
    return this.buildAuthResponse({ sub: user.id, nombre: user.nombre }, user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.validateCredentials(dto.nombre, dto.password);
    if (!user) {
      throw new UnauthorizedException('Nombre o contraseña incorrectos');
    }

    return this.buildAuthResponse(
      { sub: user.id, nombre: user.nombre },
      this.usersService.toPublicUser(user),
    );
  }

  async profile(userId: number) {
    return this.usersService.getProfile(userId);
  }

  private async buildAuthResponse(payload: AuthUserPayload, user: unknown) {
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      token_type: 'Bearer',
      user,
    };
  }
}