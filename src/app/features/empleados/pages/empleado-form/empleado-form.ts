import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css',
})
export class EmpleadoForm implements OnInit {

  empleadoForm!: FormGroup;

  modoEdicion = false;
  idEmpleado = 0;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.empleadoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      correo: [''],
      telefono: [''],
      puesto: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(1)]],
      fechaIngreso: [''],
      activo: [true]
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam) {
        this.idEmpleado = Number(idParam);
        this.modoEdicion = true;
        this.cargarEmpleado(this.idEmpleado);
      } else {
        this.modoEdicion = false;
        this.idEmpleado = 0;
      }
    });
  }

  private cargarEmpleado(id: number): void {
    this.empleadoService.obtenerPorId(id).subscribe({
      next: (empleado) => {
        this.empleadoForm.patchValue({
          nombre: empleado.nombre,
          puesto: empleado.puesto,
          salario: empleado.salario,
          activo: empleado.activo
        });
      },
      error: () => {
        alert('No se pudo cargar el empleado.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/empleados']);
  }

  public guardar() {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    const empleado = this.empleadoForm.value as Empleado;
    const peticion = this.modoEdicion
      ? this.empleadoService.actualizar(this.idEmpleado, empleado)
      : this.empleadoService.crear(empleado);

    peticion.subscribe({
      next: () => {
        alert(this.modoEdicion ? 'Empleado actualizado correctamente' : 'Empleado guardado correctamente');
        this.router.navigate(['/empleados']);
      },
      error: () => {
        alert('Ocurrió un error al guardar el empleado.');
      }
    });
  }

}