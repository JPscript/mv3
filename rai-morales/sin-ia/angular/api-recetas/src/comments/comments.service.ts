import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly restaurantsService: RestaurantsService,
    private readonly usersService: UsersService,
  ) {}

  async findByRestaurantId(restaurantId: number) {
    await this.restaurantsService.ensureExists(restaurantId);
    const comments = await this.commentsRepository.find({
      where: { restaurant_id: restaurantId },
      relations: { user: true },
      order: { created_at: 'DESC' },
    });

    return comments.map((comment) => ({
      id: comment.id,
      comentario: comment.comentario,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      user: comment.user
        ? {
            id: comment.user.id,
            nombre: comment.user.nombre,
            image_url: comment.user.image_url,
          }
        : null,
    }));
  }

  async create(restaurantId: number, userId: number, dto: CreateCommentDto) {
    await this.restaurantsService.ensureExists(restaurantId);
    await this.usersService.findEntityById(userId);

    const comment = this.commentsRepository.create({
      restaurant_id: restaurantId,
      user_id: userId,
      comentario: dto.comentario.trim(),
    });

    await this.commentsRepository.save(comment);
    return this.findByRestaurantId(restaurantId);
  }
}