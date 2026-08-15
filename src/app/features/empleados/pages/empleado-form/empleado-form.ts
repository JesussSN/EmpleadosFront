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
  puestos: Array<{ id: number; nombre: string }> = [];

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

  this.cargarPuestos();

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

private cargarPuestos(): void {

  this.empleadoService.listarPuestos().subscribe({

    next: (puestos) => {
      this.puestos = puestos;
    },

    error: () => {
      this.puestos = [];
      alert('No se pudieron cargar los puestos.');
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

      const datos = this.empleadoForm.value;

      // Teléfono sin guiones
      const telefonoLimpio = datos.telefono
        ? datos.telefono.replace(/\D/g, '')
        : '';

      // Salario sin comas
      const salarioLimpio = datos.salario
        ? Number(datos.salario.toString().replace(/,/g, ''))
        : 0;

      const empleado: Empleado = {

        ...datos,

        telefono: telefonoLimpio,

        salario: salarioLimpio

      };

      console.log('📤 Enviando al backend:', empleado);

      const peticion = this.modoEdicion
        ? this.empleadoService.actualizar(
            this.idEmpleado,
            empleado
          )
        : this.empleadoService.crear(
            empleado
          );

      peticion.subscribe({

        next: () => {

          alert(
            this.modoEdicion
              ? 'Empleado actualizado correctamente'
              : 'Empleado guardado correctamente'
          );

          this.router.navigate(['/empleados']);

        },

        error: (error) => {

          console.error('❌ Error al guardar:', error);

          alert('Ocurrió un error al guardar el empleado.');

        }

      });

    }
      // ==============================
    // FORMATO DE TELÉFONO
    // ==============================

    formatearTelefono(valor: string): string {

      const soloDigitos = valor
        .replace(/\D/g, '')
        .slice(0, 10);

      if (soloDigitos.length <= 3) {
        return soloDigitos;
      }

      if (soloDigitos.length <= 6) {
        return `${soloDigitos.slice(0, 3)}-${soloDigitos.slice(3)}`;
      }

      if (soloDigitos.length <= 8) {
        return `${soloDigitos.slice(0, 3)}-${soloDigitos.slice(3, 6)}-${soloDigitos.slice(6)}`;
      }

      return `${soloDigitos.slice(0, 3)}-${soloDigitos.slice(3, 6)}-${soloDigitos.slice(6, 8)}-${soloDigitos.slice(8, 10)}`;
    }


    alIngresarTelefono(evento: Event): void {

      const input = evento.target as HTMLInputElement;

      const formateado = this.formatearTelefono(input.value);

      this.empleadoForm
        .get('telefono')
        ?.setValue(formateado, { emitEvent: false });

    }


    // ==============================
    // FORMATO DE SALARIO
    // ==============================

    formatearSalario(valor: string | number): string {

      if (valor === null || valor === undefined || valor === '') {
        return '';
      }

      const soloNumeros = valor
        .toString()
        .replace(/\D/g, '');

      if (!soloNumeros) {
        return '';
      }

      return Number(soloNumeros).toLocaleString('en-US');
    }


    alIngresarSalario(evento: Event): void {

      const input = evento.target as HTMLInputElement;

      const formateado = this.formatearSalario(input.value);

      this.empleadoForm
        .get('salario')
        ?.setValue(formateado, { emitEvent: false });

    }
}