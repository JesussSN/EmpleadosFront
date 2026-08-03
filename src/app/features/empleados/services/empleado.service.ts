import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleado } from '../models/empleado.model';
import { environment } from '../../../../environment';
import { Estadisticas } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/empleados`;

  private apiEstadisticas = `${environment.apiUrl}/estadisticas`;


  listar(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.api);
  }


  obtenerEstadisticas(): Observable<Estadisticas> {

    return this.http.get<Estadisticas>(
      this.apiEstadisticas
    );

  }


  obtenerPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.api}/${id}`);
  }


  crear(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(
      this.api,
      empleado
    );
  }


  actualizar(id:number, empleado:Empleado):Observable<Empleado>{

    return this.http.put<Empleado>(
      `${this.api}/${id}`,
      empleado
    );

  }


  eliminar(id:number):Observable<void>{

    return this.http.delete<void>(
      `${this.api}/${id}`
    );

  }

  obtenerGrafica(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/grafica/empleados`, {
      responseType: 'blob'
    });
  }

  // Pastel
  obtenerGraficaPastel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/grafica/pastel`, {
      responseType: 'blob'
    });
  }

  // Top 5 salarios
  obtenerGraficaTopSalarios(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/grafica/top-salarios`, {
      responseType: 'blob'
    });
  }

  // Histograma de salarios
  obtenerGraficaDistribucionSalarios(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/grafica/distribucion-salarios`, {
      responseType: 'blob'
    });
  }

  // Empleados por puesto
  obtenerGraficaEmpleadosPorPuesto(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/grafica/empleados-por-puesto`, {
      responseType: 'blob'
    });
  }

  // Salario promedio por puesto
  obtenerGraficaPromedioPorPuesto(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/grafica/promedio-por-puesto`, {
      responseType: 'blob'
    });
  }

}

