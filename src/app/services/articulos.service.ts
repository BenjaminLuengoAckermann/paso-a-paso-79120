import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Articulo } from '../models/articulo';

@Injectable({ providedIn: 'root' })
export class ArticulosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://labsys.frc.utn.edu.ar:8443/api/articulos/';
  }

  get(Nombre: string, Activo: boolean, Pagina: number) {
    let params = new HttpParams();
    if (Nombre != null) {
      params = params.append('Nombre', Nombre);
    }

    if (Activo != null) {
      // Evitamos error null.toString()
      params = params.append('Activo', Activo.toString());
    }

    params = params.append('Pagina', Pagina.toString());

    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  getById(id: number) {
    return this.httpClient.get(this.resourceUrl + id);
  }

  post(obj: Articulo) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(id: number, obj: Articulo) {
    return this.httpClient.put(this.resourceUrl + id, obj);
  }

  delete(id) {
    return this.httpClient.delete(this.resourceUrl + id);
  }
}
