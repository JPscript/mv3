import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUserPayload } from '../auth/interfaces/auth-user-payload.interface';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('restaurants/:restaurantId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('summary')
  getSummary(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.ratingsService.getSummary(restaurantId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyRating(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @CurrentUser() user: AuthUserPayload,
  ) {
    return this.ratingsService.getMyRating(restaurantId, user.sub);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrUpdate(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @CurrentUser() user: AuthUserPayload,
    @Body() dto: CreateRatingDto,
  ) {
    return this.ratingsService.createOrUpdate(restaurantId, user.sub, dto);
  }
}