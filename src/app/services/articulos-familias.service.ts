import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ArticuloFamilia } from '../models/articulo-familia';

@Injectable({
  providedIn: 'root'
})
export class ArticulosFamiliasService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl =
      'https://labsys.frc.utn.edu.ar:8443/api/ArticulosFamilias/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }
}
