import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
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
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/Service/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { VentaService } from 'src/app/Service/venta.service';

@Component({
  selector: 'app-ventas-crear',
  templateUrl: './ventas-crear.component.html',
  styleUrls: ['./ventas-crear.component.css']
})
export class VentasCrearComponent implements OnInit {


  ingreso: Ingreso = {
    id_persona: 0,
    id_usuario: 0,
    usuario_modificacion: ''
  }
  venta: any = {}

  fechaMostrar?: Date = new Date();
  mostrarTabla = false;
  mostrarTabla2 = false;
  clientes?: Cliente[];
  clienteElegido: any = {}
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
    private productoService: ProductoService, private clienteService: ClienteService,
    private marcaServices: MarcaService, private categoriaServices: CategoriaService,
    private ventaService: VentaService) { }

  ngOnInit(): void {
    if ((this.datosGlobales.logueado) && ((this.datosGlobales.rolLogueado === 'A ') || (this.datosGlobales.rolLogueado === 'V '))) {
      this.getClientes();
      this.getCategoriasAndMarcas();
    } else {
      this.router.navigate(['/']);
    }
  }

  getClientes() {
    this.venta.id_persona = 0;//valida que se elija un cliente
    this.clienteService.getAll().subscribe(resp => {
      this.clientes = resp
      console.log(resp);
    }
    );
  }

  clienteSeleccionado(id: any) {
    this.clienteService.get(id).subscribe(res => {
      this.clienteElegido = res;
      this.id_proveedor_Elegido = id;
      this.venta.id_persona = id;
      console.log(this.clienteElegido);
    });
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
    console.log('pasa aqui')
    await this.services.getByMarcaAndCat(this.marcaBucar, this.categoriaBuscar).toPromise().then(res => {
      console.log('pasa aqui')
      if ((res.length > 0)) {
        console.log('pasa aqui')
        let resultado: any[] = [];
        let productosRespuesta: any[] = [];
        resultado = res;
        //para mostrar los productos con existencia
        for (let producto of resultado) {
          if (producto.existencias > 0) {
            productosRespuesta.push(producto);
          }
        }
        console.log(productosRespuesta)
        this.productos = productosRespuesta;
        this.dataSource.data = productosRespuesta;
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
    if (this.categoriaBuscar > 0) {
      this.getProductos();
    }
  }

  categoriaBuscar: any;
  getCategorias(id_categoria: any) {
    this.categoriaBuscar = id_categoria;
    if (this.marcaBucar > 0) {
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
  mostrarVender: boolean = false;
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
        this.mostrarVender = true;
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

  //setea todos los parametros que se necesita para el servicio
  venderProducto() {
    let pocasExistencias = false;
    let guardar = true;
    for (let producto of this.productosSeleccionados) {
      if ((producto.cantidad === null) || (producto.cantidad === 0) || (producto.cantidad === undefined)) {
        guardar = false;
      }
      if (producto.cantidad > producto.existencias) {
        producto.cantidad = producto.existencias;
        pocasExistencias = true;
      }
    }
    if (pocasExistencias) {
      Swal.fire({
        title: 'AVISO:',
        text: 'Hay un producto que se disminuyo la cantidad  por falta de existencia',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
        } else {
          guardar = false;
        }
      });
    }
    if (guardar) {


      if (this.venta.id_persona === 0) {
        Swal.fire({
          text: 'Debe de seleccionar un cliente',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6'
        })
      } else {
        this.venta.id_usuario = this.datosGlobales.id_usuario_logueado;
        this.venta.usuario_creacion = this.datosGlobales.usernameLogueado;
        let total_compra: number = 0;
        let id_producto: any[] = [];

        let pocasExistencias = false;
        for (let producto of this.productosSeleccionados) {//obtiene el total de la venta
          if (producto.cantidad > producto.existencias) {
            producto.cantidad = producto.existencias;
            pocasExistencias = true;
          }
          let precio_por_cantidad: number = (producto.precio * producto.cantidad);
          total_compra += precio_por_cantidad;
          let enviarProducto = {
            id_producto: producto.id_producto,
            cantidad: producto.cantidad
          }
          id_producto.push(enviarProducto)
        }



        this.venta.total_venta = total_compra;
        this.venta.productos = id_producto;

        console.log(this.venta)
        //se guarda la venta
        this.ventaService.create(this.venta).toPromise().then(res => {
          Swal.fire('Venta Realizada Correctamente!', 'success');
          this.router.navigate(['/ventas']);
        }).catch((err: any) => {
          console.log(err);
          Swal.fire({
            text: 'No se pudo realizar la venta',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6'
          });
        });
      }

    } else {
      Swal.fire('Cantidad Vacia', 'El producto debe de tener una cantidad', 'warning');
    }
  }

}
