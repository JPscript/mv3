import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 6 })
  latitud: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 6 })
  longitud: number;
}