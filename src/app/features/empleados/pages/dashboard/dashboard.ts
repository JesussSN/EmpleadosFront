import { Component } from '@angular/core';
import { Carousel } from './components/carousel/carousel';
import { ConocerMas } from './components/conocer-mas/conocer-mas';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-dashboard',
  imports: [Carousel, ConocerMas],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  mostrarResumen = false;
  tipoResumen: 'empresa' | 'servicios' | 'valores' = 'empresa';

  abrirResumen(tipo: 'empresa' | 'servicios' | 'valores'): void {
    this.tipoResumen = tipo;
    this.mostrarResumen = true;
  }

  cerrarResumen(): void {
    this.mostrarResumen = false;
  }
}
