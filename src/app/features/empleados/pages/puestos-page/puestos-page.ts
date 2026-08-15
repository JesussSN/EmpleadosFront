import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-puestos-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './puestos-page.html',
  styleUrl: './puestos-page.css'
})
export class PuestosPageComponent implements OnInit {

  puestos: Array<{ id: number; nombre: string }> = [];

  nuevoPuesto = '';

  cargando = true;

  constructor(
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.cargarPuestos();
  }

  cargarPuestos(): void {

    this.cargando = true;

    this.empleadoService.listarPuestos().subscribe({

      next: (puestos) => {

        this.puestos = puestos;

        this.cargando = false;

      },

      error: (error) => {

        console.error('Error al cargar puestos:', error);

        this.puestos = [];

        this.cargando = false;

        alert('No se pudieron cargar los puestos.');

      }

    });

  }

  guardarPuesto(): void {

    const nombre = this.nuevoPuesto.trim();

    if (!nombre) {
      alert('Escribe un nombre de puesto.');
      return;
    }

    this.empleadoService.crearPuesto(nombre).subscribe({

      next: () => {

        this.nuevoPuesto = '';

        // Volvemos a consultar el backend
        this.cargarPuestos();

      },

      error: (error) => {

        console.error('Error al guardar puesto:', error);

        alert('No se pudo guardar el puesto.');

      }

    });

  }

  eliminarPuesto(id: number): void {

    const confirmar = confirm(
      '¿Deseas eliminar este puesto?'
    );

    if (!confirmar) {
      return;
    }

    this.empleadoService.eliminarPuesto(id).subscribe({

      next: () => {

        // Volvemos a consultar el backend
        this.cargarPuestos();

      },

      error: (error) => {

        console.error('Error al eliminar puesto:', error);

        alert(
          'No se pudo eliminar el puesto porque está en uso o no existe.'
        );

      }

    });

  }

}