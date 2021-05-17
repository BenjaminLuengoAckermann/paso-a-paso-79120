import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Articulo, Articulos } from '../models/articulo';

@Injectable({ providedIn: 'root' })
export class MockArticulosServiciosService {
  constructor() {}

  get(Nombre: string, Activo: boolean, pagina: number): any {
    var Items = Articulos.filter(
      item =>
        // Nombre == null chekea null y undefines
        (Nombre == null ||
          Nombre == '' ||
          item.Nombre.toUpperCase().includes(Nombre.toUpperCase())) &&
        (Activo == null || item.Activo == Activo)
    );

    // Ordenar
    Items = Items.sort((a, b) =>
      a.Nombre.toUpperCase() > b.Nombre.toUpperCase() ? 1 : -1
    );

    // Paginar con Slice
    var RegistrosTotal = Items.length;
    var RegistroDesde = (pagina - 1) * 10;
    Items = Items.slice(RegistroDesde, RegistroDesde + 10);
    return of({ Items: Items, RegistrosTotal: RegistrosTotal });
  }

  // JS no acepta sobrecargas, por eso este metodo
  getById(id: number) {
    var item: Articulo = Articulos.filter(x => x.IdArticulo === id)[0];
    return of(item);
  }

  post(obj: Articulo) {
    obj.IdArticulo = new Date().getTime();
    obj.IdArticuloFamilia = +obj.IdArticuloFamilia; // Convierto a numero, cuando se envia al servidor se hace automaticamente al enalzar las prop del modelo definido en el backend

    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;

    Articulos.push(obj);
    return of(obj);
  }

  put(id: number, obj: Articulo) {
    var indice;
    var items = Articulos.filter(function(item, index) {
      if (item.IdArticulo === id) {
        indice = index;
      }
    });

    obj.IdArticuloFamilia = +obj.IdArticuloFamilia;
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;

    Articulos[indice] = obj;
    return of(obj);
  }

  delete(id: number) {
    var items = Articulos.filter(x => x.IdArticulo === id);
    items[0].Activo = !items[0].Activo;
    return of(items[0]);
  }
}
