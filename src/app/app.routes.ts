import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Dashboard } from './features/empleados/pages/dashboard/dashboard';
import { EmpleadosListComponent } from './features/empleados/pages/empleados-list/empleados-list';
import { EmpleadoForm } from './features/empleados/pages/empleado-form/empleado-form';
import { EstadisticasPageComponent } from './features/empleados/pages/estadisticas-page/estadisticas-page';
import { PuestosPageComponent } from './features/empleados/pages/puestos-page/puestos-page';

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
      },
      {
        path: 'empleados/editar/:id',
        component: EmpleadoForm
      },
      {
        path: 'estadisticas',
        component: EstadisticasPageComponent
      },
      {
        path: 'puestos',
        component: PuestosPageComponent
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];