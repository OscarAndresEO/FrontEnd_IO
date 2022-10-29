import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ClienteService } from 'src/app/Service/cliente.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: any = {}

  constructor(private clienteService: ClienteService,
    private router: Router,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if (this.datosGlobales.logueado) {
      this.getAll();
    } else {
      this.router.navigate(['/']);
    }
  }

  downloadPdf() {
    var doc = new jsPDF;
    autoTable(doc, { html: "#pdf" });
    doc.save("clientes");
  }

  getAll() {
    this.clienteService.getAll().subscribe(
      prov => {
        this.clientes = prov
      }
    );
  }

  deleteCliente(id_cliente?: number) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro de eliminar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id_cliente).subscribe(
          (data) => {
            this.clientes = this.clientes?.filter((cl: any) => cl.id_cliente != id_cliente);
            Swal.fire('Exito', 'El Cliente se elimino con exito!', 'success')
            this.getAll();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar al Cliente.', 'error')
          }
        );
      }
    })
  }

}
