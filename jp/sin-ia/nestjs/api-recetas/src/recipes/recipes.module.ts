import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([Recipe, Restaurant])],
	controllers: [RecipesController],
	providers: [RecipesService],
	exports: [RecipesService],
})
export class RecipesModule {}
