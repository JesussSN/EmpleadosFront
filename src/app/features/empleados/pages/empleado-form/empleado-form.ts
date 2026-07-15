import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css',
})
export class EmpleadoForm {

  empleadoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {

    this.empleadoForm = this.fb.group({

      nombre: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      apellidoPaterno: ['', Validators.required],

      apellidoMaterno: [''],

      correo: ['', [
        Validators.required,
        Validators.email
      ]],

      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],

      puesto: ['', Validators.required],

      salario: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      fechaIngreso: [
        '',
        Validators.required
      ]

    });

  }

  guardar() {

  if (this.empleadoForm.invalid) {

    this.empleadoForm.markAllAsTouched();
    return;

  }

  this.empleadoService.crear(this.empleadoForm.value as any).subscribe({
          next: (respuesta) => {
            console.log(respuesta);
            alert('Empleado guardado correctamente');
            this.router.navigate(['/empleados']);
          },

          error: (error) => {
            console.error(error);
            alert('Ocurrió un error al guardar.');
          }

        });

  }

}