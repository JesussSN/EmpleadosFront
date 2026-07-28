import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  empleados: Empleado[] = [];
  busqueda = '';
  paginaActual = 1;
  tamanoPagina = 2;

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  private cdr = inject(ChangeDetectorRef);

  cargarEmpleados(): void {
    this.empleadoService.listar()
    .subscribe({
      next:(respuesta)=>{
        this.empleados = respuesta;
        this.cdr.detectChanges();
      },
      error:(error)=>{
        console.error(
          "Error consultando empleados",
          error
        );
      }
    });
  }

  get empleadosFiltrados(): Empleado[] {
    const texto = this.busqueda.trim().toLowerCase();

    if (!texto) {
      return this.empleados;
    }

    return this.empleados.filter((empleado) => {
      return (
        empleado.nombre.toLowerCase().includes(texto) ||
        empleado.puesto.toLowerCase().includes(texto)
      );
    });
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.empleadosFiltrados.length / this.tamanoPagina));
  }

  get empleadosPagina(): Empleado[] {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return this.empleadosFiltrados.slice(inicio, inicio + this.tamanoPagina);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) {
      return;
    }

    this.paginaActual = pagina;
  }

  onBusquedaChange(valor: string): void {
    this.busqueda = valor;
    this.paginaActual = 1;
  }

  editarEmpleado(empleado: Empleado) {
    this.router.navigate(['/empleados/editar', empleado.id]);
  }

  irAEstadisticas(): void {
    this.router.navigate(['/estadisticas']);
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