import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioPrestamoPageRoutingModule } from './usuario-prestamo-routing.module';

import { UsuarioPrestamoPage } from './usuario-prestamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPrestamoPageRoutingModule
  ],
  declarations: [UsuarioPrestamoPage]
})
export class UsuarioPrestamoPageModule {}
