import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Estadisticas } from '../../interfaces/empleado';
import { CurrencyPipe } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-estadisticas-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './estadisticas-card.html',
  styleUrl: './estadisticas-card.css'
})
export class EstadisticasCardComponent implements OnInit {
  private empleadoService = inject(EmpleadoService);
  private cdr = inject(ChangeDetectorRef);

  estadisticas!: Estadisticas;

  graficaBarras: string | null = null;
  graficaPastel: string | null = null;
  graficaTopSalarios: string | null = null;
  graficaDistribucion: string | null = null;
  graficaEmpleadosPuesto: string | null = null;
  graficaPromedioPuesto: string | null = null;

  cargandoGrafica = false;

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
    if (this.cargandoGrafica) {
      return;
    }

    this.cargandoGrafica = true;
    this.limpiarGraficasAnteriores();
    this.cdr.detectChanges();

    const peticiones = [
      {
        request: () => this.empleadoService.obtenerGrafica(),
        asignar: (blob: Blob | null) => {
          this.graficaBarras = blob ? this.crearUrlDesdeBlob(blob) : null;
        }
      },
      {
        request: () => this.empleadoService.obtenerGraficaPastel(),
        asignar: (blob: Blob | null) => {
          this.graficaPastel = blob ? this.crearUrlDesdeBlob(blob) : null;
        }
      },
      {
        request: () => this.empleadoService.obtenerGraficaTopSalarios(),
        asignar: (blob: Blob | null) => {
          this.graficaTopSalarios = blob ? this.crearUrlDesdeBlob(blob) : null;
        }
      },
      {
        request: () => this.empleadoService.obtenerGraficaDistribucionSalarios(),
        asignar: (blob: Blob | null) => {
          this.graficaDistribucion = blob ? this.crearUrlDesdeBlob(blob) : null;
        }
      },
      {
        request: () => this.empleadoService.obtenerGraficaEmpleadosPorPuesto(),
        asignar: (blob: Blob | null) => {
          this.graficaEmpleadosPuesto = blob ? this.crearUrlDesdeBlob(blob) : null;
        }
      },
      {
        request: () => this.empleadoService.obtenerGraficaPromedioPorPuesto(),
        asignar: (blob: Blob | null) => {
          this.graficaPromedioPuesto = blob ? this.crearUrlDesdeBlob(blob) : null;
        }
      }
    ];

    this.cargarGraficaSecuencial(peticiones, 0);
  }

  private cargarGraficaSecuencial(
    peticiones: Array<{ request: () => Observable<Blob>; asignar: (blob: Blob | null) => void }>,
    indice: number
  ): void {
    if (indice >= peticiones.length) {
      this.cargandoGrafica = false;
      this.cdr.detectChanges();
      return;
    }

    const peticion = peticiones[indice];

    peticion.request().pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (blob) => {
        peticion.asignar(blob);
        this.cdr.detectChanges();
        this.cargarGraficaSecuencial(peticiones, indice + 1);
      },
      error: () => {
        peticion.asignar(null);
        this.cdr.detectChanges();
        this.cargarGraficaSecuencial(peticiones, indice + 1);
      }
    });
  }

  private crearUrlDesdeBlob(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  private limpiarGraficasAnteriores(): void {
    [this.graficaBarras, this.graficaPastel, this.graficaTopSalarios, this.graficaDistribucion, this.graficaEmpleadosPuesto, this.graficaPromedioPuesto].forEach((url) => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    });

    this.graficaBarras = null;
    this.graficaPastel = null;
    this.graficaTopSalarios = null;
    this.graficaDistribucion = null;
    this.graficaEmpleadosPuesto = null;
    this.graficaPromedioPuesto = null;
  }
}
