import { Component, Input, OnInit, inject } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Estadisticas } from '../../interfaces/empleado';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-estadisticas-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './estadisticas-card.html',
  styleUrl: './estadisticas-card.css'
})
export class EstadisticasCardComponent implements OnInit {
  private empleadoService = inject(EmpleadoService);

  estadisticas!: Estadisticas;
  imagenGrafica: string | null = null;

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.empleadoService.obtenerEstadisticas().subscribe({
      next: (respuesta) => {
        this.estadisticas = respuesta;
      },
      error: (error) => {
        console.error('Error cargando estadísticas', error);
      }
    });
  }

  generarGrafica(): void {
    this.empleadoService.obtenerGrafica().subscribe({
      next: (blob: Blob) => {
        if (this.imagenGrafica) {
          URL.revokeObjectURL(this.imagenGrafica);
        }

        this.imagenGrafica = URL.createObjectURL(blob);
      },
      error: (error) => {
        console.error('No se pudo generar la gráfica', error);
        this.imagenGrafica = null;
      }
    });
  }
}
