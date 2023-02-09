import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFacturaPage } from './add-factura.page';

const routes: Routes = [
  {
    path: '',
    component: AddFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFacturaPageRoutingModule {}
