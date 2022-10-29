import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ingreso } from 'src/app/models/ingreso';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { IngresoService } from 'src/app/Service/ingreso.service';
import { MarcaService } from 'src/app/Service/marca.service';
import { ProductoService } from 'src/app/Service/producto.service';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { SucursalService } from 'src/app/Service/sucursal.service';
import Swal from 'sweetalert2';

export interface ProductoSel {
  id_producto?: number; //generated always as identity(start with 1 increment by 1),
  nombre_producto?: string; //varchar(64),
  id_marca?: number;
  descripcion?: string;
  linea?: string; //varchar(64),
  modelo?: number; //int,
  cilindraje?: number; //int,
  espec_tecnicas?: string; //varchar(1000),
  existencias?: number; //int,
  precio?: number; //numeric(8,2),
  id_categoria?: number; //int,
  descripcion_cat?: string;
  id_usuario?: number; //int,
  nombre?: string; //nombre del
  id_persona?: number; //int, --proveedor
  nombre_persona?: string;
  estado?: string; //char(1) default 'A',
  usuario_creacion?: string; //varchar(16),--usar dpi o nit 
  nombre_usuario?: string;
  usuario_modificacion?: string; //varchar(16), --usar dpi o nit
  fecha_creacion?: string; //timestamp default current_timestamp, 
  fecha_modificacion?: string; //timestamp default current_timestamp,

}

@Component({
  selector: 'app-ingreso-crear',
  templateUrl: './ingreso-crear.component.html',
  styleUrls: ['./ingreso-crear.component.css']
})

export class IngresoCrearComponent implements OnInit {

  ingreso: Ingreso = {
    id_persona: 0,
    id_usuario: 0,
    usuario_modificacion: ''
  }
  compra: any = {}

  fechaMostrar?: Date = new Date();
  mostrarTabla = false;
  mostrarTabla2 = false;
  proveedores?: Proveedor[];
  provedElegido: any = {}
  id_proveedor_Elegido: any = '';
  prudctElegido: any[] = [];
  productos: any = {}
  ingresos?: any[];
  categorias: any = {}
  marcas: any = {}
  nombreProducto: any;

  constructor(private services: ProductoService,
    private router: Router,
    private datosGlobales: DatosGlobalesService,
    private productoService: ProductoService, private proveedorService: ProveedorService,
    private marcaServices: MarcaService, private categoriaServices: CategoriaService,
    private ingresoService: IngresoService) { }

  ngOnInit(): void {
    if ((this.datosGlobales.logueado) && ((this.datosGlobales.rolLogueado === 'A ') || (this.datosGlobales.rolLogueado === 'B '))) {
      this.getProveedores();
      this.getCategoriasAndMarcas();
    } else {
      this.router.navigate(['/']);
    }

  }

  getProveedores() {
    this.proveedorService.getAll().subscribe(resp => {
      this.proveedores = resp
      console.log(resp);
    }
    );
  }

  provedorSeleccionado(id: any) {
    this.proveedorService.get(id).subscribe(res => {
      this.provedElegido = res;
      this.id_proveedor_Elegido = id;
      this.compra.id_persona = id;
      console.log(this.provedElegido);
    });

    if ((this.marcaBucar > 0) && (this.categoriaBuscar > 0)) {
      this.getProductos();
    }
  }

  getCategoriasAndMarcas() {
    this.categoriaServices.getAll().subscribe(res => {
      this.categorias = res;
    });
    this.marcaServices.getAll().subscribe(res => {
      this.marcas = res;
    })
  }

  async getProductos() {
    await this.services.getByMarcaAndCatAndProved(this.marcaBucar, this.categoriaBuscar, this.id_proveedor_Elegido).toPromise().then(res => {
      if (res.length > 0) {
        this.productos = res;
        this.dataSource.data = this.productos;
        this.mostrarTabla = true;
      } else {
        Swal.fire({
          text: 'No hay productos aun con estas especificaciones',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6'
        });
      }
    }).catch((err: any) => {
      Swal.fire({
        text: 'No hay productos aun con estas especificaciones',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6'
      })
    });
  }
  marcaBucar: any;
  getMarcas(id_marca: any) {
    this.marcaBucar = id_marca;
    if ((this.categoriaBuscar > 0) && (this.id_proveedor_Elegido > 0)) {
      this.getProductos();
    }
  }
  categoriaBuscar: any;
  getCategorias(id_categoria: any) {
    this.categoriaBuscar = id_categoria;
    if ((this.marcaBucar > 0) && (this.id_proveedor_Elegido > 0)) {
      this.getProductos();
    }
  }

  displayedColumns: string[] = ['id_producto', 'nombre_producto', 'linea', 'modelo', 'cilindraje', 'existencias', 'accion'];
  dataSource = new MatTableDataSource();
  displayedColumns2: string[] = ['id_producto', 'nombre_producto', 'linea', 'modelo', 'cilindraje', 'existencias', 'accion'];
  dataSource2 = new MatTableDataSource();


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //productosSeleccionados:ProductoSel = {};
  productosSeleccionados: any[] = [];
  seleccionarProducto(id_producto: any) {
    let guardar = true;
    for (let producto of this.productosSeleccionados) {//obtiene el total de la compra
      if (producto.id_producto === id_producto) {
        guardar = false;
      }
    }
    if (guardar) {
      this.productoService.get(id_producto).subscribe(res => {
        this.productosSeleccionados.push(res);
        console.log(this.productosSeleccionados)
        this.mostrarTabla2 = true;
      });
    } else {
      Swal.fire('Repetido', 'El producto solo se debe seleccionar una vez', 'warning');
    }
  }

  eliminarSeleccionado(id_p: any) {
    let result = this.productosSeleccionados.find((item) => (item.id_producto == id_p)).subscribe(
      this.productosSeleccionados.splice(id_p, 1),
      this.productosSeleccionados = this.productosSeleccionados?.filter(
        (producto: any) => producto.id_producto != id_p)
    );
    console.log(result)
  }

  eliminarProducto(id_producto: any) {
    this.productoService.get(id_producto).subscribe(res => {
      let producto = res;
      let contador = this.prudctElegido.length;
      this.prudctElegido.filter((item) => item !== producto);
      console.log(this.prudctElegido)
    })
  }
  //setea todos los parametros que se necesita para el servicio
  ingresarProductos() {

    let guardar = true;
    for (let producto of this.productosSeleccionados) {//obtiene el total de la compra
      if ((producto.cantidad === null) || (producto.cantidad === 0) || (producto.cantidad === undefined)) {
        guardar = false;
      }
    }

    if (guardar) {

      this.compra.id_usuario = this.datosGlobales.id_usuario_logueado;
      this.compra.usuario_creacion = this.datosGlobales.usernameLogueado;
      let total_compra: number = 0;
      let id_producto: any[] = [];

      for (let producto of this.productosSeleccionados) {//obtiene el total de la compra

        let precio_por_cantidad: number = (producto.precio * producto.cantidad);
        total_compra += precio_por_cantidad;
        let enviarProducto = {
          id_producto: producto.id_producto,
          cantidad: producto.cantidad
        }
        id_producto.push(enviarProducto)
      }
      this.compra.id_compra_detalle=0;
      this.compra.productos = id_producto;
      this.compra.total_compra = total_compra;

      console.log(this.compra);
      //se guarda la compra
      this.ingresoService.create(this.compra).toPromise().then(res => {
        Swal.fire('Ingreso Realizado Correctamente!', 'success');
        this.router.navigate(['/ingresos']);
      }).catch((err: any) => {
        console.log(err);
        Swal.fire({
          text: 'No se pudo realizar el ingreso',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6'
        })
      });



    } else {
      Swal.fire('Cantidad Vacia', 'El producto debe de tener una cantidad', 'warning');
    }
  }
}





