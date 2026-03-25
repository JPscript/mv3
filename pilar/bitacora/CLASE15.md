# CLASE15

## Tema y objetivo del día

- **Tema:** Conexión con API de restaurantes.
- **Fecha:** Lunes 23 de marzo 2026.
- **Horario:** 16:30 - 20:30.
- **Objetivo:** Construir una página con Angular que consuma una API de restaurantes.


## Resultados de aprendizaje de la sesión

- Comprensión del concepto de services en Angular.
- Uso de services para centralizar la lógica de la aplicación.
- Implementación de un service para gestionar los datos de restaurantes.

## Conocimientos adquiridos en con los ejercicios de la sesión

Durante esta sesión aprendimos qué son los services en Angular y por qué son fundamentales para organizar el código y separar responsabilidades.

Vimos cómo crear un service y cómo utilizarlo dentro de los componentes para consumir datos. Como ejercicio práctico, desarrollamos el service de restaurantes, que nos servirá como plantilla para implementar el resto de funcionalidades de la aplicación.

Esto nos permitirá avanzar de forma más estructurada y reutilizable en el proyecto.

# Predicción próxima clase

- Integrar el service en los componentes para mostrar los datos en pantalla.

## Entregables mínimos del día

- Service de restaurantes creado y funcional.
- Conexión entre el service y los componentes.
- Registro breve de dudas en `DUDAS.md`.
- Nota corta en la bitácora personal sobre lo aprendido y las dificultades encontradas.

## Autoevaluación y próximos pasos

- [x] Comprendí qué son los services en Angular.
- [x]Creé el service de restaurantes correctamente.
- [x] Escribí cómo me sentí durante la clase.
- [x] Registré mis dudas en `DUDAS.md`.
- [x] Escribí mi predicción para la siguiente clase.

## Conexión a la API

### Creamos el servicio

En consola, en mi proyecto: ng g s components/pages/home/services/restaurantes
(Se genera la carpeta con dos archivos dentro "spec.ts" y ".ts")

### En app.config.ts:
	- Añadimos: import { provideHttpClient } from '@angular/common/http';
	- Y añadimos dentro de appConfig: provideHttpClient()

### Generamos la interfaz en la terminal:
	- ng g i interfaces/restaurante

### Dentro de la interfaz, en restaurante.ts:
	import { Injectable, inject } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { Observable } from 'rxjs';
	import { Restaurante } from '../../../../interfaces/restaurante';
	
	@Injectable({
	  providedIn: 'root',
	})
	export class Restaurantes {
	  private readonly http = inject(HttpClient);
	  private readonly apiUrl = 'http://localhost:3000';
	
	  getAllRestaurants(): Observable<Restaurante[]> {
	    return this.http.get<Restaurante[]>(${this.apiUrl}/restaurants);
	  }
	}

### Alli donde vamos a usar la interfaz (home.ts):
	import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
		import { RestauranteCard } from './components/restaurante-card/restaurante-card';
	import { Restaurante } from '../../../interfaces/restaurante';
	import { Restaurantes } from './services/restaurantes';
	
	@Component({
	  selector: 'app-home',
	  imports: [RestauranteCard],
	  templateUrl: './home.html',
	  styleUrl: './home.css',
	})
	export class Home {
	  private readonly restaurantesService = inject(Restaurantes);
	  private readonly changeDetectorRef = inject(ChangeDetectorRef);
	  restaurantes: Restaurante[] = [];
	  isLoading = false;
	  errorMessage = '';
	  ngOnInit(): void {
	    this.getRestaurantes();
	  }
	  getRestaurantes(): void {
	    this.isLoading = true;
	    this.restaurantesService.getAllRestaurants().subscribe({
	      next:(resRestaurantes) => {
	        this.restaurantes = resRestaurantes;
	        this.isLoading = false;
	        this.changeDetectorRef.detectChanges();
	      },
	      error: () => {
	        this.errorMessage = 'No se pudieron cargar los restaurantes.';
	        this.isLoading = false;
	        this.changeDetectorRef.detectChanges();
	      }
	    })
	  }
	}