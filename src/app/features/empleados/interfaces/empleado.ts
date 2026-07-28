export interface Empleado {

    id?: number;

    nombre: string;

    apellidoPaterno: string;

    apellidoMaterno: string;

    correo: string;

    telefono: string;

    puesto: string;

    salario: number;

    fechaIngreso: string;

}

export interface Estadisticas {

  total: number;

  activos: number;

  inactivos: number;

  salario_promedio: number;

  salario_maximo: number;

  salario_minimo: number;

}