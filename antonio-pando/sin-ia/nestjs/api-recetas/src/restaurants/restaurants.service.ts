import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { buildPublicFileUrl } from '../common/file-url.util';
import { Rating } from '../ratings/entities/rating.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateRestaurantDto) {
    const restaurant = this.restaurantsRepository.create(dto);
    return this.restaurantsRepository.save(restaurant);
  }

  async findAll() {
    const restaurants = await this.restaurantsRepository.find({ order: { id: 'ASC' } });
    const recipes = await this.recipesRepository.find();
    const ratings = await this.ratingsRepository.find();

    return restaurants.map((restaurant) => {
      const restaurantRecipes = recipes.filter(
        (recipe) => recipe.restaurant_id === restaurant.id,
      );
      const restaurantRatings = ratings.filter(
        (rating) => rating.restaurant_id === restaurant.id,
      );

      return {
        ...restaurant,
        total_recetas: restaurantRecipes.length,
        rating_summary: this.buildRatingSummary(restaurantRatings),
      };
    });
  }

  async findOne(id: number) {
    const restaurant = await this.restaurantsRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${id} no existe`);
    }

    const [recipes, comments, ratings] = await Promise.all([
      this.recipesRepository.find({ where: { restaurant_id: id }, order: { id: 'ASC' } }),
      this.commentsRepository.find({
        where: { restaurant_id: id },
        relations: { user: true },
        order: { created_at: 'DESC' },
      }),
      this.ratingsRepository.find({ where: { restaurant_id: id }, order: { id: 'ASC' } }),
    ]);

    return {
      ...restaurant,
      recipes,
      comments: comments.map((comment) => ({
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
      })),
      rating_summary: this.buildRatingSummary(ratings),
    };
  }

  async update(id: number, dto: UpdateRestaurantDto) {
    const restaurant = await this.findEntity(id);
    const merged = this.restaurantsRepository.merge(restaurant, dto);
    return this.restaurantsRepository.save(merged);
  }

  async remove(id: number) {
    const restaurant = await this.findEntity(id);
    await this.restaurantsRepository.remove(restaurant);
    return { message: `Restaurant ${id} eliminado` };
  }

  async attachImage(id: number, fileName: string) {
    const restaurant = await this.findEntity(id);
    const appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');
    restaurant.fotografia_url = buildPublicFileUrl(appUrl, fileName);
    return this.restaurantsRepository.save(restaurant);
  }

  async ensureExists(id: number) {
    return this.findEntity(id);
  }

  private async findEntity(id: number) {
    const restaurant = await this.restaurantsRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${id} no existe`);
    }
    return restaurant;
  }

  private buildRatingSummary(ratings: Rating[]) {
    const count = ratings.length;
    const total = ratings.reduce((sum, rating) => sum + rating.calificacion, 0);
    return {
      average: count ? Number((total / count).toFixed(2)) : 0,
      count,
      distribution: {
        '1': ratings.filter((rating) => rating.calificacion === 1).length,
        '2': ratings.filter((rating) => rating.calificacion === 2).length,
        '3': ratings.filter((rating) => rating.calificacion === 3).length,
        '4': ratings.filter((rating) => rating.calificacion === 4).length,
        '5': ratings.filter((rating) => rating.calificacion === 5).length,
      },
    };
  }
}