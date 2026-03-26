import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUserPayload } from '../auth/interfaces/auth-user-payload.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('restaurants/:restaurantId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findByRestaurantId(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.commentsService.findByRestaurantId(restaurantId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @CurrentUser() user: AuthUserPayload,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(restaurantId, user.sub, dto);
  }
}