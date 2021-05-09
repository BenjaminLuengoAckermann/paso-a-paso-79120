import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArticuloFamilia } from './models/articulo-familia';

@Injectable({
  providedIn: 'root'
})
export class MockArticulosFamiliasService {
  constructor() {}
  get() {
    return of(ArticuloFamilia);
  }
}
