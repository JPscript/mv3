import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  restaurantesFake = [
    {
      id: 1,
      nombre: "Mcdonalds",
      descripcion: "La mejor hamburgueseria de comida rapida",
      imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.nbcdfw.com%2F2022%2F12%2FPhoto_McDonalds-Small-Format-Restaurant_Courtesy-of-McDonalds-of-North-Texas-1.jpg%3Fquality%3D85%26strip%3Dall%26resize%3D1200%252C675&f=1&nofb=1&ipt=b86715072da43e9f89be70eeae1965de28150a4e781ee268c278701358f8d294",
      coordenadas: { lat: 40.7128, lng: -74.0060},
    },
    {
      id: 2,
      nombre: "Burger King",
      descripcion: "Hamburguesas a la parrilla con sabor único",
      imagen: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80",
      coordenadas: { lat: 40.7138, lng: -74.0050},
    },
    {
      id: 3,
      nombre: "KFC",
      descripcion: "El auténtico pollo frito crujiente receta original",
      imagen: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
      coordenadas: { lat: 40.7148, lng: -74.0040},
    },
    {
      id: 4,
      nombre: "Telepizza",
      descripcion: "El secreto está en la masa. Pizzas a domicilio",
      imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      coordenadas: { lat: 40.7158, lng: -74.0030},
    },
    {
      id: 5,
      nombre: "Taco Bell",
      descripcion: "Lo mejor de la comida Tex-Mex, tacos y burritos",
      imagen: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
      coordenadas: { lat: 40.7168, lng: -74.0020},
    },
    {
      id: 6,
      nombre: "Subway",
      descripcion: "Bocadillos y ensaladas frescas preparadas a tu gusto",
      imagen: "https://images.unsplash.com/photo-1616422285623-aa30eb2ce368?w=500&q=80",
      coordenadas: { lat: 40.7178, lng: -74.0010},
    },
    {
      id: 7,
      nombre: "Domino's Pizza",
      descripcion: "Pizzas americanas clásicas con bordes rellenos",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
      coordenadas: { lat: 40.7188, lng: -74.0000},
    },
    {
      id: 8,
      nombre: "100 Montaditos",
      descripcion: "Cerveza fría y una enorme variedad de montaditos",
      imagen: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
      coordenadas: { lat: 40.7198, lng: -73.9990},
    },
    {
      id: 9,
      nombre: "Foster's Hollywood",
      descripcion: "Costillas asadas y comida típica de película",
      imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80",
      coordenadas: { lat: 40.7208, lng: -73.9980},
    },
    {
      id: 10,
      nombre: "VIPS",
      descripcion: "Tortitas, sándwiches club y platos internacionales",
      imagen: "https://images.unsplash.com/photo-1508424757105-b6d5ef0ac32e?w=500&q=80",
      coordenadas: { lat: 40.7218, lng: -73.9970},
    },
    {
      id: 11,
      nombre: "Ginos",
      descripcion: "Pasta fresca y auténticos sabores italianos",
      imagen: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80",
      coordenadas: { lat: 40.7228, lng: -73.9960},
    },
    {
      id: 12,
      nombre: "Five Guys",
      descripcion: "Hamburguesas premium con toppings infinitos y cacahuetes",
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      coordenadas: { lat: 40.7238, lng: -73.9950},
    },
    {
      id: 13,
      nombre: "La Tagliatella",
      descripcion: "Raciones gigantes de comida tradicional del norte de Italia",
      imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80",
      coordenadas: { lat: 40.7248, lng: -73.9940},
    },
    {
      id: 14,
      nombre: "TGB - The Good Burger",
      descripcion: "Hamburguesas urbanas en un ambiente relajado y moderno",
      imagen: "https://images.unsplash.com/photo-1594212691515-ab19b4561bf7?w=500&q=80",
      coordenadas: { lat: 40.7258, lng: -73.9930},
    },
    {
      id: 15,
      nombre: "Goiko Grill",
      descripcion: "Chorreo puro y hamburguesas gourmet para mancharse las manos",
      imagen: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&q=80",
      coordenadas: { lat: 40.7268, lng: -73.9920},
    }
  ]
}
