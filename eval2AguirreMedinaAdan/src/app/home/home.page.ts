import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/api-service';
import { Usuario } from '../modelo/Usuario';
import { UsuarioPage } from '../usuario/usuario.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private nav:NavController, private api:ApiServiceProvider, private modal: ModalController, private alert:AlertController) { }
  
  

  async usuarioExistente() {
    const alert = await this.alert.create({
      header: 'Buscar usuario',
      inputs: [
        {
          name: "id",
          type: "number",
          placeholder:"Id del usuario"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async (data) => {
            let usuario:Usuario = await this.api.getUsuario(data['id']);
            if (usuario != null) {
              this.navegarUsuario(usuario);
            } else
              this.usuarioNoEncontrado();
          },
        },
      ],
    });
    await alert.present();
    

  }

  async navegarUsuario(u: Usuario) {
    const modal = await this.modal.create({
      component: UsuarioPage,
      componentProps: {
        'usuarioJson': JSON.stringify(u)
      }
    });
  
    return await modal.present();
  }

  async usuarioNoEncontrado() {
    const alert = await this.alert.create({
      header: 'Error',
      message:"Usuario no encontrado",
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
          },
        },
      ],
    });
    await alert.present();

  }

  async usuariosConPrestamos() {
    this.nav.navigateForward("usuario-prestamo");
  }

}
