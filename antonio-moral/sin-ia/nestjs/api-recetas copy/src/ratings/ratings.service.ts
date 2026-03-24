import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { UsersService } from '../users/users.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    private readonly restaurantsService: RestaurantsService,
    private readonly usersService: UsersService,
  ) {}

  async getSummary(restaurantId: number) {
    await this.restaurantsService.ensureExists(restaurantId);
    const ratings = await this.ratingsRepository.find({
      where: { restaurant_id: restaurantId },
      order: { id: 'ASC' },
    });

    const count = ratings.length;
    const total = ratings.reduce((sum, rating) => sum + rating.calificacion, 0);

    return {
      average: count ? Number((total / count).toFixed(2)) : 0,
      count,
      ratings: ratings.map((rating) => ({
        id: rating.id,
        user_id: rating.user_id,
        calificacion: rating.calificacion,
        created_at: rating.created_at,
        updated_at: rating.updated_at,
      })),
    };
  }

  async getMyRating(restaurantId: number, userId: number) {
    await this.restaurantsService.ensureExists(restaurantId);
    const rating = await this.ratingsRepository.findOne({
      where: { restaurant_id: restaurantId, user_id: userId },
    });

    return rating
      ? {
          id: rating.id,
          restaurant_id: rating.restaurant_id,
          user_id: rating.user_id,
          calificacion: rating.calificacion,
          created_at: rating.created_at,
          updated_at: rating.updated_at,
        }
      : null;
  }

  async createOrUpdate(restaurantId: number, userId: number, dto: CreateRatingDto) {
    await this.restaurantsService.ensureExists(restaurantId);
    await this.usersService.findEntityById(userId);

    const existingRating = await this.ratingsRepository.findOne({
      where: { restaurant_id: restaurantId, user_id: userId },
    });

    if (existingRating) {
      existingRating.calificacion = dto.calificacion;
      await this.ratingsRepository.save(existingRating);
    } else {
      const rating = this.ratingsRepository.create({
        restaurant_id: restaurantId,
        user_id: userId,
        calificacion: dto.calificacion,
      });
      await this.ratingsRepository.save(rating);
    }

    return {
      my_rating: await this.getMyRating(restaurantId, userId),
      summary: await this.getSummary(restaurantId),
    };
  }
}