import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  it('filtra y pagina los empleados correctamente', () => {
    const component = new Dashboard();

    component.empleados = [
      { id: 1, nombre: 'Ana Pérez', puesto: 'Desarrolladora', salario: 2000, activo: true },
      { id: 2, nombre: 'Carlos Ruiz', puesto: 'Diseñador', salario: 1800, activo: true },
      { id: 3, nombre: 'Laura Gómez', puesto: 'Analista', salario: 1900, activo: false },
      { id: 4, nombre: 'Pedro Díaz', puesto: 'Manager', salario: 2200, activo: true }
    ];

    component.busqueda = 'ana';
    expect(component.empleadosFiltrados.map(e => e.id)).toEqual([1]);
    expect(component.empleadosPagina.map(e => e.id)).toEqual([1]);

    component.busqueda = '';
    component.cambiarPagina(2);
    expect(component.empleadosPagina.map(e => e.id)).toEqual([4]);
  });
});
