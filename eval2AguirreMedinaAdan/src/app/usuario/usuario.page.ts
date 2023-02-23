import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/api-service';
import { Libro } from '../modelo/Libro';
import { Usuario } from '../modelo/Usuario';
import { NuevoPrestamoPage } from '../nuevo-prestamo/nuevo-prestamo.page';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  @Input() usuarioJson:any;
  libros: Libro[];
  usuario: Usuario;

  constructor(private api:ApiServiceProvider, private modalC:ModalController, private alert:AlertController) { }

  async ngOnInit() {
    this.usuario = JSON.parse(this.usuarioJson);
    this.libros = await this.api.getLibrosUsuario(this.usuario.id);
  }


  async devolverLibro(indice: number) {
    const alert = await this.alert.create({
      header: '¿Desea devolve el libro?',
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
          handler: (data) => {
            let libroDevolver: Libro = this.libros[indice];

            libroDevolver.diasPrestamo = null;
            libroDevolver.fechaPrestamo = null;
            libroDevolver.idUsuarioPrestamo = null;

            if (this.api.modificaLibro(libroDevolver))
              this.libros.splice(indice, 1);
          },
        },
      ],
    });
    await alert.present();
  }

  volver() {
    this.modalC.dismiss();
  }

  async nuevoPrestamo() {
    const modal = await this.modalC.create({
      component: NuevoPrestamoPage
    });

    modal.onDidDismiss().then((data) => {
      let l: Libro = data['data'];
      if (l != null) {
        let fecha: Date = new Date();
        l.diasPrestamo = 10;
        l.idUsuarioPrestamo = this.usuario.id;
        l.fechaPrestamo = (String)(fecha.getDate() + "-" + (fecha.getMonth()+1) + "-" + fecha.getFullYear());
        this.api.modificaLibro(l);
        this.libros.push(l);
      }
    });
  
    return await modal.present();
  }

}
