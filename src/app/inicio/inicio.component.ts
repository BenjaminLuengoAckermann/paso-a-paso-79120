import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia, ArticulosFamilia} from '../models/articulo-familia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  titulo = 'Pymes Demo - 2021';

  constructor() {}

  ngOnInit() {}
}
