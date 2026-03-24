import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUserPayload } from '../auth/interfaces/auth-user-payload.interface';
import { buildImageUploadOptions } from '../common/image-upload-options';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthUserPayload) {
    return this.usersService.getProfile(user.sub);
  }

  @Patch('me')
  updateMe(@CurrentUser() user: AuthUserPayload, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(user.sub, dto);
  }

  @Post('me/image')
  @UseInterceptors(FileInterceptor('image', buildImageUploadOptions()))
  uploadProfileImage(
    @CurrentUser() user: AuthUserPayload,
    @UploadedFile() file: { filename: string } | undefined,
  ) {
    if (!file) {
      throw new BadRequestException('Debes enviar un archivo en el campo image');
    }

    return this.usersService.attachImage(user.sub, file.filename);
  }
}