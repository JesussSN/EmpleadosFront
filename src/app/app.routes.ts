import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Dashboard } from './features/empleados/pages/dashboard/dashboard';
import { EmpleadosListComponent } from './features/empleados/pages/empleados-list/empleados-list';
import { EmpleadoForm } from './features/empleados/pages/empleado-form/empleado-form';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: 'empleados',
        component: EmpleadosListComponent
      },
      {
        path: 'empleados/nuevo',
        component: EmpleadoForm
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];