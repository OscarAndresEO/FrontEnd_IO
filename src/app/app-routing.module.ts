import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { CrearComponent } from './components/sucursal/crear/crear/crear.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioCrearComponent } from './components/usuario/usuario-crear/usuario-crear.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaCrearComponent } from './components/categoria/categoria-crear/categoria-crear.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProveedorCrearComponent } from './components/proveedor/proveedor-crear/proveedor-crear.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteCrearComponent } from './components/cliente/cliente-crear/cliente-crear.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoCrearComponent } from './components/producto/producto-crear/producto-crear.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { IngresoCrearComponent } from './components/ingreso/ingreso-crear/ingreso-crear.component';
import { LoginComponent } from './components/login/login.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentasCrearComponent } from './components/ventas/ventas-crear/ventas-crear.component';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes =
  [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'sucursales', component: SucursalComponent },
    { path: 'sucursales/crear', component: CrearComponent },
    { path: 'sucursales/update/:id_sucursal', component: CrearComponent },

    { path: 'usuarios', component: UsuarioComponent },
    { path: 'usuarios/crear', component: UsuarioCrearComponent },
    { path: 'usuarios/update/:id_usuario', component: UsuarioCrearComponent },

    { path: 'marcas', component: MarcaComponent },
    { path: 'marcas/crear', component: CrearMarcaComponent },
    { path: 'marcas/update/:id_marca', component: CrearMarcaComponent },

    { path: 'categorias', component: CategoriaComponent },
    { path: 'categorias/crear', component: CategoriaCrearComponent },
    { path: 'categorias/update/:id_categoria', component: CategoriaCrearComponent },

    { path: 'proveedores', component: ProveedorComponent },
    { path: 'proveedores/crear', component: ProveedorCrearComponent },
    { path: 'proveedores/update/:id_persona', component: ProveedorCrearComponent },

    { path: 'clientes', component: ClienteComponent },
    { path: 'clientes/crear', component: ClienteCrearComponent },
    { path: 'clientes/update/:id_persona', component: ClienteCrearComponent },

    { path: 'productos', component: ProductoComponent },
    { path: 'productos/crear', component: ProductoCrearComponent },
    { path: 'productos/update/:id_producto', component: ProductoCrearComponent },

    { path: 'ingresos', component: IngresoComponent },
    { path: 'ingresos/crear', component: IngresoCrearComponent },
    { path: 'ingresos/update/:id_ingreso', component: IngresoCrearComponent },

    { path: 'ventas', component: VentasComponent },
    { path: 'ventas/crear', component: VentasCrearComponent },
    { path: 'ventas/update/:id_venta', component: VentasCrearComponent },



  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }