import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia } from '../models/articulo-familia';
import { MockArticulosFamiliasService } from '../mock-articulos-familias.service';
import { ArticulosFamiliasService } from '../articulos-familias.service';

@Component({
  selector: 'app-articulos-familia',
  templateUrl: './articulos-familia.component.html',
  styleUrls: ['./articulos-familia.component.css']
})
export class ArticulosFamiliaComponent implements OnInit {
  Titulo = 'Articulos Familias';
  Items: ArticuloFamilia[] = [];

  constructor(
    //private articulosFamiliaService: MockArticulosFamiliasService
    private articulosFamiliasService: ArticulosFamiliasService
  ) {}

  ngOnInit() {
    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Items = res;
    });
  }
}
