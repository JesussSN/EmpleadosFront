import { Component } from '@angular/core';
import { EstadisticasCardComponent } from '../../components/estadisticas-card/estadisticas-card';

@Component({
  selector: 'app-estadisticas-page',
  standalone: true,
  imports: [EstadisticasCardComponent],
  templateUrl: './estadisticas-page.html',
  styleUrl: './estadisticas-page.css'
})
export class EstadisticasPageComponent {}
