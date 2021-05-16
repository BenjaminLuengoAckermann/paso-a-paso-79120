import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  Titulo: string = 'Titulo a poner';
  TituloAccionABMC: string = 'Accion ABMC a poner';
  AccionABMC: string = 'A poner';

  constructor() {}

  ngOnInit() {}
}
