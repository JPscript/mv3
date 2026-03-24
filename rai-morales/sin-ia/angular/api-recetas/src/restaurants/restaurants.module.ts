import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../comments/entities/comment.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Restaurant, Recipe, Comment, Rating])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService, TypeOrmModule],
})
export class RestaurantsModule {}