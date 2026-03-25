import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RestauranteCard } from './components/restaurante-card/restaurante-card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Restaurante } from '../../../interfaces/restaurante';
import { Restaurantes } from './servicios/restaurantes-servicios';
import { Receta } from '../../../interfaces/receta';
import { Recetas } from './servicios/recetas-servicios';
import { Calificaciones } from './servicios/calificacion-servicios';
import { Calificacion } from '../../../interfaces/calificacion';

@Component({
  selector: 'app-home',
  imports: [RestauranteCard, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
/*export class Home {
  restaurantes = [
    {
      id: 1,
      nombre: 'Restaurante A',
      descripcion: 'Descripcion del Restaurante A',
      imagen: "assets/id1.jpg",
      coordenadas: { latitud: 40.7128, longitud: -74.0060 },
    },
    {
      id: 2,
      nombre: 'Restaurante B',
      descripcion: 'Descripcion del Restaurante B',
      imagen: "assets/id2.jpg",
      coordenadas: { latitud: 34.0522, longitud: -118.2437 },
    },
    {
      id: 3,
      nombre: 'Restaurante C',
      descripcion: 'Descripcion del Restaurante C',
      imagen: "assets/id3.jpg",
      coordenadas: { latitud: 41.8781, longitud: -87.6298 },
    },
    {
      id: 4,
      nombre: 'Restaurante D',
      descripcion: 'Descripcion del Restaurante D',
      imagen: "assets/id4.jpg",
      coordenadas: { latitud: 29.7604, longitud: -95.3698 },
    },
    {
      id: 5,
      nombre: 'Restaurante E',
      descripcion: 'Descripcion del Restaurante E',
      imagen: "assets/id5.jpg",
      coordenadas: { latitud: 33.4481, longitud: -112.0752 },
    }
  ]

  restauranteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.restauranteForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [''],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
    });
  }

  crearRestaurante() {
    if (this.restauranteForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const nuevoRestaurante = {
      id: this.restaurantesFake.length + 1,
      nombre: this.restauranteForm.value.nombre,
      descripcion: this.restauranteForm.value.descripcion,
      imagen: this.restauranteForm.value.imagen || 'assets/default.jpg',
      coordenadas: {
        latitud: this.restauranteForm.value.latitud,
        longitud: this.restauranteForm.value.longitud,
      }
    };

    this.restaurantesFake.push(nuevoRestaurante);
    this.restauranteForm.reset();
    console.log('Restaurante creado:', nuevoRestaurante);
  }

  actualizarRestaurante(id: number) {
    console.log('Actualizar restaurante con id', id);
  }

  eliminarRestaurante(id: number) {
    console.log('Eliminar restaurante con id', id);
    this.restaurantesFake = this.restaurantesFake.filter(r => r.id !== id);
  }

  trackById(index: number, restaurante: any) {
    return restaurante.id;
  }
}*/

export class Home {
  private readonly restaurantesService = inject(Restaurantes); //Usas inject() para obtener una instancia del servicio Restaurantes.
  private readonly changeDetectorRef = inject(ChangeDetectorRef); //Inyectas ChangeDetectorRef, que sirve para forzar la actualización de la vista.
  restaurantes: Restaurante[] = []; //Array donde guardarás los restaurantes obtenidos.
  isLoading = true;
  errorRestaurante = '';

  private readonly recetasService = inject(Recetas);
  recetas: Receta[] = []; // Array donde guardaré las recetas obtenidas. 
  restauranteSeleccionado: Restaurante | null = null;
  isLoadingRecetas = true;
  errorRecetas = '';

  private readonly calificacionService = inject(Calificaciones);
  calificaciones: Calificacion[] = [];
  restauranteSeleccionadoCal: Restaurante | null = null;
  isLoadingCalificaciones = true;
  errorCalificaciones = '';
  
  ngOnInit(): void { //ngOnInit se ejecuta cuando el componente se inicializa, es decir, en cuanto levanto ng serve!!!
    this.getRestaurantes(); //ngOnInit llama a getRestaurantes() para cargar datos al inicio.
  }
  getRestaurantes(): void {
    this.isLoading = true;
    this.restaurantesService.getAllRestaurants().subscribe({ //.subscribe() se usa porque es un Observable (Angular usa RxJS).
      next: (restaurantes) => {
        this.restaurantes = restaurantes;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }, 
      error: () => {
        this.errorRestaurante = 'Error al cargar los restaurantes';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  verRecetas(id: number): void {
    const restaurante = this.restaurantes.find(r => r.id === id);
    if (!restaurante) {
      return;
    } this.restauranteSeleccionado = restaurante; 
      this.isLoadingRecetas = true;
      this.errorRecetas = '';
      this.recetas = [];
      this.recetasService.getRecetasByRestaurante(id).subscribe({
        next: (recetas) => {
          this.recetas = recetas;
          this.isLoadingRecetas = false;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.errorRecetas = 'Error al cargar las recetas';
          this.isLoadingRecetas = false;
          this.changeDetectorRef.detectChanges();
        }
      })
  }

  verCalificaciones(id: number): void {
    const restaurante = this.restaurantes.find(r => r.id === id);
    if (!restaurante) {
      return;
    } this.restauranteSeleccionadoCal = restaurante; 
      this.isLoadingCalificaciones = true;
      this.errorCalificaciones = '';
      this.calificaciones = [];
      this.calificacionService.getCalificacionByRestaurante(id).subscribe({
        next: (calificaciones) => {
          this.calificaciones = calificaciones;
          this.isLoadingCalificaciones = false;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.errorRecetas = 'Error al cargar las calificaciones';
          this.isLoadingCalificaciones = false;
          this.changeDetectorRef.detectChanges();
        }
      })

  }
}



