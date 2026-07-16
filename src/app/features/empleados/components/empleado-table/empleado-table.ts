import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleado-table',
  standalone: true,
  imports: [],
  templateUrl: './empleado-table.html',
  styleUrl: './empleado-table.css'
})
export class EmpleadoTableComponent {

  @Input()
  empleados: Empleado[] = [];

  @Output()
  editar = new EventEmitter<Empleado>();

  @Output()
  eliminar = new EventEmitter<number>();

}