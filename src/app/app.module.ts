import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

/**
 * MATERIAL
 * **/ 
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
/*** 
 * Componentes creados
 * **/
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MenuComponent } from './components/compartido/menu/menu.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioCrearComponent } from './components/usuario/usuario-crear/usuario-crear.component';

/**
 * SwetAlert
 */

 import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CrearComponent } from './components/sucursal/crear/crear/crear.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcaComponent } from './components/marca/marca.component';
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaCrearComponent } from './components/categoria/categoria-crear/categoria-crear.component';
import { ProveedorCrearComponent } from './components/proveedor/proveedor-crear/proveedor-crear.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteCrearComponent } from './components/cliente/cliente-crear/cliente-crear.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoCrearComponent } from './components/producto/producto-crear/producto-crear.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { IngresoCrearComponent } from './components/ingreso/ingreso-crear/ingreso-crear.component';
import { LoginComponent } from './components/login/login.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentasCrearComponent } from './components/ventas/ventas-crear/ventas-crear.component';

 //import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    MenuComponent,
    SucursalComponent,
    SidenavComponent,
    CrearComponent,
    UsuarioComponent,
    UsuarioCrearComponent,
    MarcaComponent,
    CrearMarcaComponent,
    CategoriaComponent,
    CategoriaCrearComponent,
    ProveedorComponent,
    ProveedorCrearComponent,
    ClienteComponent,
    ClienteCrearComponent,
    ProductoComponent,
    ProductoCrearComponent,
    IngresoComponent,
    IngresoCrearComponent,
    LoginComponent,
    VentasComponent,
    VentasCrearComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ }),
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
