import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtletaPage } from './atleta.page';

const routes: Routes = [
  {
    path: '',
    component: AtletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtletaPageRoutingModule {}
