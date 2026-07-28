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

}