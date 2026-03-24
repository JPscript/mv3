import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { buildPublicFileUrl } from '../common/file-url.util';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateRecipeDto) {
    await this.ensureRestaurantExists(dto.restaurant_id);
    const recipe = this.recipesRepository.create(dto);
    return this.recipesRepository.save(recipe);
  }

  findAll() {
    return this.recipesRepository.find({
      relations: { restaurant: true },
      order: { id: 'ASC' },
    });
  }

  findByRestaurantId(restaurantId: number) {
    return this.recipesRepository.find({
      where: { restaurant_id: restaurantId },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: { restaurant: true },
    });
    if (!recipe) throw new NotFoundException(`Recipe ${id} no existe`);
    return recipe;
  }

  async update(id: number, dto: UpdateRecipeDto) {
    if (dto.restaurant_id) {
      await this.ensureRestaurantExists(dto.restaurant_id);
    }
    const recipe = await this.findOne(id);
    const merged = this.recipesRepository.merge(recipe, dto);
    return this.recipesRepository.save(merged);
  }

  async remove(id: number) {
    const recipe = await this.findOne(id);
    await this.recipesRepository.remove(recipe);
    return { message: `Recipe ${id} eliminada` };
  }

  async attachImage(id: number, fileName: string) {
    const recipe = await this.findOne(id);
    const appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');
    recipe.image_url = buildPublicFileUrl(appUrl, fileName);
    return this.recipesRepository.save(recipe);
  }

  private async ensureRestaurantExists(restaurantId: number) {
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${restaurantId} no existe`);
    }
    return restaurant;
  }
}
