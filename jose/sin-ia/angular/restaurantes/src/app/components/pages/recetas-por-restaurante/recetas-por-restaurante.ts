import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RecetasService } from "../../../services/recetas.service";
import { Receta } from "../../../models/recetaInterfaz";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-recetas',
    imports: [CommonModule],
    templateUrl : './recetas-por-restaurante.html',
    styleUrl: './recetas-por-restaurante.css', 
    standalone: true 

})
export class RecetasPorRestaurante implements OnInit {

     constructor(private recetasService: RecetasService, private route: ActivatedRoute){}
    ngOnInit(): void {
        
    }

}