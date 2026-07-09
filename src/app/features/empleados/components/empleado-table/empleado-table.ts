import { Component, Input, SimpleChanges } from '@angular/core';

import { Empleado } from '../../models/empleado.model';


@Component({
  selector:'app-empleado-table',
  standalone:true,
  imports:[],
  templateUrl:'./empleado-table.html',
  styleUrl:'./empleado-table.css'
})
export class EmpleadoTableComponent {


@Input()
empleados:Empleado[]=[];

    ngOnChanges(changes: SimpleChanges): void {

    console.log('Cambio en empleados:', this.empleados);

  }



}