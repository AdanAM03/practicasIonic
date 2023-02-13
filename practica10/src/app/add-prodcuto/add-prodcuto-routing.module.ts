import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProdcutoPage } from './add-prodcuto.page';

const routes: Routes = [
  {
    path: '',
    component: AddProdcutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProdcutoPageRoutingModule {}
