// NestJS: app.controller.ts (Solución corregida)
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('restaurants')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET /restaurants (para el listado)
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id') // GET /restaurants/:id (para el detalle)
  // 'ParseIntPipe' convierte automáticamente el string '1' a number 1
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
}
