import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProdcutoPageRoutingModule } from './add-prodcuto-routing.module';

import { AddProdcutoPage } from './add-prodcuto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProdcutoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddProdcutoPage]
})
export class AddProdcutoPageModule {}
