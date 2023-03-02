import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtletaPageRoutingModule } from './atleta-routing.module';

import { AtletaPage } from './atleta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtletaPageRoutingModule
  ],
  declarations: [AtletaPage]
})
export class AtletaPageModule {}
