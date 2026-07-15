import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { environment } from '../../../../environment';



@Injectable({
  providedIn:'root'
})
export class EmpleadoService {

private http = inject(HttpClient);
private api = `${environment.apiUrl}/empleados`;


listar():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.api);
}


crear(empleado:Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(
        this.api,
        empleado
    );

}


actualizar(id:number, empleado:Empleado){
    return this.http.put(
        `${this.api}/${id}`,
        empleado
    );

}


eliminar(id:number){

    return this.http.delete(
        `${this.api}/${id}`
    );

}


}