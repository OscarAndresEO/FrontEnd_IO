import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import autoTable from 'jspdf-autotable';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: any = {}
  //usuarios?:Usuario[];
  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if ((this.datosGlobales.logueado) &&(this.datosGlobales.rolLogueado === 'A ')) {
      this.usuarioService.getAll().subscribe(
        users => {
          this.usuarios = users
          // console.log(this.usuarios)
          //console.log(this.usuarios.id_sucursal[])
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  downloadPdf() {
    var doc = new jsPDF;
    autoTable(doc, { html: "#pdf" });
    doc.save("usuarios");
  }

  deleteUsuario(id_usuario?: number) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro de eliminar el Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id_usuario);
        this.usuarioService.delete(id_usuario).subscribe(
          (data) => {
            this.usuarios = this.usuarios?.filter((usuario: any) => usuario.id_usuario != id_usuario);
            Swal.fire('Exito', 'El Usuario se elimino con exito!', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar al usuario.', 'error')
          }
        );
      }
    })
  }

}
