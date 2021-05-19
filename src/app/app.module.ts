import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ArticulosFamiliaComponent } from './components/articulos-familia/articulos-familia.component';
import { MockArticulosFamiliasService } from './services/mock-articulos-familias.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { MockArticulosServiciosService } from './services/mock-articulos-servicios.service';

import { ReactiveFormsModule } from '@angular/forms';
import { ArticulosService } from './services/articulos.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'articulos-familias', component: ArticulosFamiliaComponent },
      { path: 'articulos', component: ArticulosComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticulosFamiliaComponent,
    MenuComponent,
    ArticulosComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    MockArticulosFamiliasService,
    {
      provide: APP_BASE_HREF,
      useValue: '/',
      providers: [MockArticulosServiciosService],
      providers: [ArticulosService]
    }
  ]
})
export class AppModule {}
