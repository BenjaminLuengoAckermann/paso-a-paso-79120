import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloFamilia } from '../../models/articulo-familia';
import { MockArticulosServiciosService } from '../../services/mock-articulos-servicios.service';
import { MockArticulosFamiliasService } from '../../services/mock-articulos-familias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from '../../services/articulos.service';
import { ArticulosFamiliasService } from '../../services/articulos-familias.service';

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
    //private articulosService: MockArticulosServiciosService,
    //private articulosFamiliasService: MockArticulosFamiliasService
    private articulosService: ArticulosService,
    private articulosFamiliasService: ArticulosFamiliasService
  ) {}

  ngOnInit() {
    this.FormBusqueda = this.formBuilder.group({
      Nombre: [null],
      Activo: [null]
    });

    this.FormRegistro = this.formBuilder.group({
      IdArticulo: [null],
      Nombre: [null, [Validators.required, Validators.maxLength(55)]],
      Precio: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      Stock: [null, [Validators.required, Validators.pattern("[0-9]{1,10}")]],
      CodigoDeBarra: [null, [Validators.required, Validators.pattern("[0-9]{13}")]],
      IdArticuloFamilia: [null, [Validators.required]],
      FechaAlta: [null, [Validators.required, Validators.pattern("(0[1-9][12][0-9]3[01])[-/](0[1-9]1[012])[-/](19|20)[0-9]{2}")],
      Activo: [false]
    });

    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Familias = res;
    });
  }

  GetArticuloFamiliaNombre(id){
    var Nombre = this.Familias.find(x => x.IdArticuloFamilia === id)?.Nombre;
    return Nombre;
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

    this.articulosService.getById(Dto.IdArticulo).subscribe((res: any) => {
      const itemCopy = { ...res }; //copia para no modificar array del mock

      // Formateo la fecha de  ISO 8061 a string ddMMyyyy
      var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('-');
      itemCopy.FechaAlta = arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0];

      this.FormRegistro.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });
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

    if(this.FormRegistro.invalid)
    {
      return;
    }
    // Copiamos los datos del formBuilder
    const itemCopy = { ...this.FormRegistro.value };

    // Convertimos fecha a ISO
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3) {
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
    }

    if (this.AccionABMC == 'A') {
      this.articulosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        alert('Registro agregado correctamente');
        this.Buscar();
      });
    } else {
      // Modificar put
      this.articulosService
        .put(itemCopy.IdArticulo, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          alert('Registro modificado correctamente');
          this.Buscar();
        });
    }
  }

  ActivarDesactivar(Dto) {
    var resp = confirm(
      'Esta seguro de' +
        (Dto.Activo ? 'desactivar' : 'activar') +
        'este registro?'
    );
    if (resp == true) {
      this.articulosService
        .delete(Dto.IdArticulo)
        .subscribe((res: any) => this.Buscar());
    }
  }

  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    alert('No implementation');
  }
}
