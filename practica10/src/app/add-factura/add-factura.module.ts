import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFacturaPageRoutingModule } from './add-factura-routing.module';

import { AddFacturaPage } from './add-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFacturaPageRoutingModule
  ],
  declarations: [AddFacturaPage]
})
export class AddFacturaPageModule {}
