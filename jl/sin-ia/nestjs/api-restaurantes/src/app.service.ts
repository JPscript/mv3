import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly restaurantes = [
    {
      id: 1,
      nombre: 'La Esquina de Senior Cat',
      descripcion: 'Cocina casera con brunch y platos de temporada.',
      fotografia_url: 'http://localhost:3000/files/restaurant-senior-cat.jpg',
      rating_summary: { average: 4.67, count: 3 },
    },
    {
      id: 2,
      nombre: 'Bistró Ladrillos',
      descripcion: 'Restaurante urbano con menú mediterráneo.',
      fotografia_url: 'http://localhost:3000/files/bistro-ladrillos.jpg',
      rating_summary: { average: 4.33, count: 3 },
    },
    {
      id: 3,
      nombre: 'Mapa y Mesa',
      descripcion:
        'Local moderno especializado en bowls, ensaladas y platos ligeros cerca del centro.',
      fotografia_url: 'http://localhost:3000/files/mapa-mesa.jpg',
      rating_summary: { average: 4.33, count: 3 },
    },
    {
      id: 4,
      nombre: 'Puerto Sabor',
      descripcion:
        'Restaurante costero con pescado, arroces y cocina de mercado con producto fresco.',
      fotografia_url: 'http://localhost:3000/files/puerto-sabor.jpg',
      rating_summary: { average: 4.67, count: 3 },
    },
  ];

  findAll() {
    return this.restaurantes;
  }

  findOne(id: number) {
    return this.restaurantes.find((res) => res.id === id);
  }
}
