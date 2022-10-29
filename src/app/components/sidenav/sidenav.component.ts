import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Service/usuario.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav :any[] = [];
 
  getNav(){
    if(this.rol == 'V '){
      this.fillerNav=[
        {name:"Clientes",route:"/clientes",icon:"groups"},
        {name:"Motos",route:"/productos",icon:"two_wheeler"},
        {name:"Ventas",route:"/ventas",icon:"shopping_bag"}
      ];console.log('pasa aqui')
    }else if(this.rol == 'B '){
      this.fillerNav=[
        {name:"Marcas",route:"/marcas",icon:"circle"},
        {name:"Categorias",route:"/categorias",icon:"category"},
        {name:"Proveedores",route:"/proveedores",icon:"groups"},
        {name:"Motos",route:"/productos",icon:"two_wheeler"},
        {name:"Ingresos",route:"/ingresos",icon:"south"}, 
      ];console.log('pasa aqui')
    }else if(this.rol === 'A '){
        console.log('pasa aqui')
        this.fillerNav=[
        {name:"Sucursales",route:"/sucursales",icon:"store"},
        {name:"Usuarios",route:"/usuarios",icon:"person"},
        {name:"Marcas",route:"/marcas",icon:"circle"},
        {name:"Categorias",route:"/categorias",icon:"category"},
        {name:"Proveedores",route:"/proveedores",icon:"groups"},
        {name:"Clientes",route:"/clientes",icon:"groups"},
        {name:"Motos",route:"/productos",icon:"two_wheeler"},
        {name:"Ingresos",route:"/ingresos",icon:"south"}, 
        {name:"Ventas",route:"/ventas",icon:"shopping_bag"}
      ];
    }
    console.log(this.rol)
    console.log(this.fillerNav);
  }

  shouldRun = true;

  title = 'Frontend_IO_Inventario';
  hide = true;
  logueado:boolean = false;

  usuario:any={  }
  rol:String=''

  private _mobileQueryListener: () => void;

  constructor(private servicio : UsuarioService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private datosGlobales: DatosGlobalesService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);    
   }
   CerrarSesion(){
    this.datosGlobales.logueado = false;
    this.datosGlobales.rolLogueado = 'asdf'
    this.router.navigate(['/login']);
   }

   ngOnDestroy(): void {
    
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if(this.datosGlobales.logueado){
      this.rol = this.datosGlobales.rolLogueado;
      this.logueado = true;
      this.getNav();
    }
  }  
}
