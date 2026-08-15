import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-puestos-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './puestos-page.html',
  styleUrl: './puestos-page.css'
})
export class PuestosPageComponent implements OnInit {

  puestos: Array<{ id: number; nombre: string }> = [];
  nuevoPuesto = '';
  cargando = false;

  constructor(private empleadoService: EmpleadoService) {}

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
      error: () => {
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
      next: (puestoCreado) => {
        this.puestos = [puestoCreado, ...this.puestos];
        this.nuevoPuesto = '';
      },
      error: () => {
        alert('No se pudo guardar el puesto.');
      }
    });
  }

  eliminarPuesto(id: number): void {
    const confirmar = confirm('¿Deseas eliminar este puesto?');

    if (!confirmar) {
      return;
    }

    this.empleadoService.eliminarPuesto(id).subscribe({
      next: () => {
        this.puestos = this.puestos.filter((puesto) => puesto.id !== id);
      },
      error: () => {
        alert('No se pudo eliminar el puesto porque está en uso o no existe.');
      }
    });
  }
}
