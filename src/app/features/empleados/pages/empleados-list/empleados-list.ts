import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

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
private cdr = inject(ChangeDetectorRef);

  cargarEmpleados(){
    this.empleadoService.listar()
    .subscribe({
      next:(respuesta)=>{
        this.empleados = respuesta;
        this.cdr.detectChanges();
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

  editarEmpleado(empleado: Empleado) {

    console.log("Editar", empleado);

    // Más adelante:
    // this.router.navigate(['/empleados/editar', empleado.id]);

  }

  eliminarEmpleado(id: number) {

    const confirmar = confirm("¿Deseas eliminar este empleado?");

    if (!confirmar) {
      return;
    }

    this.empleadoService.eliminar(id)
      .subscribe({

        next: () => {

          this.cargarEmpleados();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}