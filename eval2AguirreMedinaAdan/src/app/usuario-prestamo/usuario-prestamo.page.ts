import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/api-service';
import { Libro } from '../modelo/Libro';
import { Usuario } from '../modelo/Usuario';
import { UsuarioPage } from '../usuario/usuario.page';

@Component({
  selector: 'app-usuario-prestamo',
  templateUrl: './usuario-prestamo.page.html',
  styleUrls: ['./usuario-prestamo.page.scss'],
})
export class UsuarioPrestamoPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private modal:ModalController, private api:ApiServiceProvider, private nav:NavController) { }

  async ngOnInit() {
    let todosLosUsuarios: Usuario[] = await this.api.getUsuarios()
      todosLosUsuarios.forEach(async (usuario: Usuario) => { 
        let libros: Libro[] = await this.api.getLibrosUsuario(usuario.id)
        if (libros.length > 0) 
          this.usuarios.push(usuario);
    });
  }

  async verUsuario(indice: number) {
    const modal = await this.modal.create({
      component: UsuarioPage,
      componentProps: {
        'usuarioJson': JSON.stringify(this.usuarios[indice])
      }
    });

    modal.onDidDismiss().then((data) => {
    });
  
    return await modal.present();
  }

  volver() {
    this.nav.back()
  } 

}
