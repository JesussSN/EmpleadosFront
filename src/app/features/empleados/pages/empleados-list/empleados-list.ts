import { Component, OnInit, inject } from '@angular/core';

import { EmpleadoService } from '../../services/empleado.service';

import { Empleado } from '../../models/empleado.model';

import { EmpleadoTableComponent } from '../../components/empleado-table/empleado-table';

@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [
    EmpleadoTableComponent
  ],
  templateUrl: './empleados-list.html',
  styleUrl: './empleados-list.css'
})
export class EmpleadosListComponent implements OnInit {

  private empleadoService = inject(EmpleadoService);
  empleados:Empleado[] = [];

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this.empleadoService.listar()
    .subscribe({
      next:(respuesta)=>{
        this.empleados = respuesta;
      },
      error:(error)=>{
        console.error(
          "Error consultando empleados",
          error
        );
      }
    });
  }

}