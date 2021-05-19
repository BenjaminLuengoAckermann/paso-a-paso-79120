import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloFamilia } from '../../models/articulo-familia';
import { MockArticulosServiciosService } from '../../services/mock-articulos-servicios.service';
import { MockArticulosFamiliasService } from '../../services/mock-articulos-familias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  Titulo: string = 'Articulos';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    C: '(Modificar)',
    D: '(Consultar)',
    L: '(Listado)'
  };

  AccionABMC: string = 'L'; // inicialmente se listan los articulos

  Mensajes = {
    SD: 'No se encontraron registros...',
    RD: 'Revisar los datos ingresados...'
  };

  Items: Articulo[] = null;
  RegistrosTotal: number;
  Familias: ArticuloFamilia[] = null;
  Pagina = 1; // Inicia en pagina 1

  // Opciones Combo Activo
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' }
  ];

  FormBusqueda: FormGroup;
  FormRegistro: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private articulosService: MockArticulosServiciosService,
    private articulosFamiliasService: MockArticulosFamiliasService
  ) {}

  ngOnInit() {
    this.FormBusqueda = this.formBuilder.group({
      Nombre: [null],
      Activo: [null]
    });

    this.FormRegistro = this.formBuilder.group({
      IdArticulo: [null],
      Nombre: [null],
      Precio: [null],
      Stock: [null],
      CodigoDeBarra: [null],
      IdArticuloFamilia: [null],
      FechaAlta: [null],
      Activo: [false]
    });

    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Familias = res;
    });
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdArticulo: 0 });
  }

  Buscar() {
    this.articulosService
      .get(
        this.FormBusqueda.value.Nombre,
        this.FormBusqueda.value.Activo,
        this.Pagina
      )
      .subscribe((res: any) => {
        this.Items = res.Items;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }

  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); //Inicio del Scroll
    this.AccionABMC = AccionABMC;
  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, 'C');
  }

  Modificar(Dto) {
    if (!Dto.Activo) {
      alert('No puede modificarse un registro inactivo');
      return;
    }
    this.BuscarPorId(Dto, 'M');
  }

  Grabar() {
    alert('Registro grabado');
    this.Volver();
  }

  ActivarDesactivar(Dto) {
    var resp = confirm(
      'Esta seguro de' +
        (Dto.Activo ? 'desactivar' : 'activar') +
        'este registro?'
    );
    if (resp == true) {
      alert('Registro activado/desactivado!');
    }
  }

  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    alert('No implementation');
  }
}
