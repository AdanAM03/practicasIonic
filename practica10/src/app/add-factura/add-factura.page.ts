import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/ApiService';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.page.html',
  styleUrls: ['./add-factura.page.scss'],
})
export class AddFacturaPage implements OnInit {
  clientes: Cliente[] = [];
  clienteSeleccionado?: Cliente;

  constructor(public navCtrl: NavController, public servicio: ApiServiceProvider) { }

  async ngOnInit() {
    this.clientes = await this.servicio.getClientes();
  }

  volver() {
    this.navCtrl.navigateBack("home");
  }

  clienteElegido(event: any) {
    this.clientes.forEach(cl => {
      if (cl.cliente == event.target.value)
        this.clienteSeleccionado = cl;
    });
    console.log(this.clienteSeleccionado);
  }

}
