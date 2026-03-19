import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { buildImageUploadOptions } from '../common/image-upload-options';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get('restaurant/:restaurantId')
  findByRestaurantId(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.recipesService.findByRestaurantId(restaurantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.remove(id);
  }

  @Post(':id/image')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', buildImageUploadOptions()),
  )
  uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: { filename: string } | undefined,
  ) {
    if (!file) {
      throw new BadRequestException('Debes enviar un archivo en el campo image');
    }
    return this.recipesService.attachImage(id, file.filename);
  }
}
