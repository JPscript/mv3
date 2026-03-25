import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Receta} from '../models/recetaInterfaz';

@Injectable({
  providedIn: 'root'
})

export class RecetasService {
  private apiURL = 'http://localhost:3000/recipes'

  constructor(private http:HttpClient) {}
  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiURL);
  }
}