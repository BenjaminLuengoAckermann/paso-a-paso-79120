import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InicioComponent } from './inicio/inicio.component';
import { ArticulosFamiliaComponent } from './articulos-familia/articulos-familia.component';
import { MockArticulosFamiliasService } from './mock-articulos-familias.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticulosFamiliaComponent
  ],
  bootstrap: [AppComponent],
  providers: [MockArticulosFamiliasService]
})
export class AppModule {}
