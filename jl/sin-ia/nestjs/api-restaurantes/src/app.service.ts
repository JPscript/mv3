import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Datos de prueba (Mock Data)
  // NestJS: app.service.ts
  private readonly restaurantes = [
    {
      id: 1,
      nombre: 'La Esquina de Senior Cat',
      fotografia_url: 'http://localhost:3000/files/restaurant-senior-cat.html', // Este ya funciona
      // ...
    },
    {
      id: 2,
      nombre: 'Bistró Ladrillos',
      fotografia_url: 'http://localhost:3000/files/bistro-ladrillos.jpg', // Asegúrate de que el nombre coincida con el archivo
      // ...
    },
    {
      id: 3,
      nombre: 'Mapa y Mesa',
      fotografia_url: 'http://localhost:3000/files/mapa-mesa.jpg',
      // ...
    },
    {
      id: 4,
      nombre: 'Puerto Sabor',
      fotografia_url: 'http://localhost:3000/files/puerto-sabor.jpg',
      // ...
    },
  ];

  // Método para obtener TODOS
  findAll() {
    return this.restaurantes;
  }

  // Método para obtener UNO solo por ID
  findOne(id: number) {
    return this.restaurantes.find((res) => res.id === id);
  }
}
