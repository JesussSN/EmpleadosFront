import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { of } from 'rxjs';

import { EmpleadoService } from '../../services/empleado.service';
import { EstadisticasCardComponent } from './estadisticas-card';

describe('EstadisticasCardComponent', () => {
  let component: EstadisticasCardComponent;
  let fixture: ComponentFixture<EstadisticasCardComponent>;

  beforeEach(async () => {
    const empleadoServiceSpy = {
      obtenerEstadisticas: () => of({
        total: 5,
        activos: 3,
        inactivos: 2,
        salario_promedio: 1200,
        salario_maximo: 2000,
        salario_minimo: 800
      }),
      obtenerGrafica: () => of(new Blob(['grafica'], { type: 'image/png' })),
      obtenerGraficaPastel: () => of(new Blob(['grafica'], { type: 'image/png' })),
      obtenerGraficaTopSalarios: () => of(new Blob(['grafica'], { type: 'image/png' })),
      obtenerGraficaDistribucionSalarios: () => of(new Blob(['grafica'], { type: 'image/png' })),
      obtenerGraficaEmpleadosPorPuesto: () => of(new Blob(['grafica'], { type: 'image/png' })),
      obtenerGraficaPromedioPorPuesto: () => of(new Blob(['grafica'], { type: 'image/png' }))
    };

    await TestBed.configureTestingModule({
      imports: [EstadisticasCardComponent],
      providers: [{ provide: EmpleadoService, useValue: empleadoServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería generar varias gráficas al hacer clic', () => {
    component.generarGrafica();

    expect(component.cargandoGrafica).toBe(false);
    expect(component.graficaBarras).not.toBeNull();
    expect(component.graficaPastel).not.toBeNull();
    expect(component.graficaTopSalarios).not.toBeNull();
    expect(component.graficaDistribucion).not.toBeNull();
    expect(component.graficaEmpleadosPuesto).not.toBeNull();
    expect(component.graficaPromedioPuesto).not.toBeNull();
  });
});
