import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { UsuarioService } from 'src/app/Service/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  usuario: any = {}

  constructor(private usuarioService: UsuarioService, private router: Router, private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
  }
  /**AQUI DEBERIA DE VALIDAR QUE EL USUARIO EXISTE */
  async login() {    
      let username= this.usuario.username;
      let clave=  this.usuario.clave;
    

    await this.usuarioService.iniciarSesion(username,clave).toPromise().then(data => {
      this.usuario = data;
      this.datosGlobales.id_usuario_logueado = this.usuario.id_usuario;
      this.datosGlobales.rolLogueado = this.usuario.rol;
      this.datosGlobales.usernameLogueado = this.usuario.username;
      this.datosGlobales.idSucursalLogueado = this.usuario.id_sucursal;
      this.datosGlobales.logueado = true;
      console.log(this.usuario)
      Swal.fire('Acceso Concedido', 'Bienvenido!', 'success');
      this.router.navigate(['']);

    }).catch((err: any) => {
      console.log(err);
      Swal.fire({
        text: 'Usuario o contraseña incorrecta',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6'
      })
    });
  }

}
