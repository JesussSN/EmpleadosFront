import { Routes } from '@angular/router';

import { EmpleadosListComponent } from './features/empleados/pages/empleados-list/empleados-list';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'empleados',
    pathMatch: 'full'
  },

  {
    path: 'empleados',
    component: EmpleadosListComponent
  }

];