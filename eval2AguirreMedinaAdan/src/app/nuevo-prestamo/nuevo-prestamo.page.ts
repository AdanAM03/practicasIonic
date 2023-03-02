import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/api-service';
import { Libro } from '../modelo/Libro';

@Component({
  selector: 'app-nuevo-prestamo',
  templateUrl: './nuevo-prestamo.page.html',
  styleUrls: ['./nuevo-prestamo.page.scss'],
})
export class NuevoPrestamoPage implements OnInit {

  opcion: String;
  parametro: any;
  libros: Libro[] = [];

  constructor(private api:ApiServiceProvider, private modal:ModalController, private alert:AlertController) { }

  ngOnInit() {
  }

  async buscar() {
    if (this.opcion != null) {
      this.libros = [];
      if (this.opcion == "titulo")
        (await this.api.getLibroTitulo(this.parametro)).forEach((libro: Libro) => {
            this.libros.push(libro);
        });
      else 
        (await this.api.getLibroId(this.parametro)).forEach((libro: Libro) => {
            this.libros.push(libro);
        });
      
    }
  }

  prestamo(indice: number) {
    if (this.libros[indice].idUsuarioPrestamo == null)
      this.modal.dismiss(this.libros[indice]);
    else {
      this.libroEnPrestamo();
    }
  }

  async libroEnPrestamo() {
    const alert = await this.alert.create({
      header: 'El libro ya ha sido prestado',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }

  volver() {
    this.modal.dismiss();
  }

}
