import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('restaurants')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }
}
