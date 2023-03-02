import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AddFacturaPage } from '../add-factura/add-factura.page';
import { ApiServiceProvider } from '../api/ApiService';
import { Factura } from '../modelo/Factura';
import { FacturaMostrar } from '../modelo/FacturaMostrar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  facturas: FacturaMostrar[] = [];
  
  constructor(public servicio: ApiServiceProvider, public alertController: AlertController, public modalController: ModalController) { }
  
  async ngOnInit(): Promise<void> { 
    let f: Factura[] = await this.servicio.getFacturas(); 
    
    f.forEach(factura => {
      let precio: number = 0;
      factura.productos.forEach(producto => {
        precio += producto.importeUnitario * producto.unidades;
      });
      precio *= (1 + factura.porcentajeIva / 100);
      this.facturas.push(new FacturaMostrar(factura.id, factura.cliente, factura.porcentajeIva, Number.parseFloat(precio.toFixed(2))));
    });
  }

  async nuevaFactura() {
    const modal = await this.modalController.create({
      component: AddFacturaPage
    });

    modal.onDidDismiss().then((data) => {
      let factura:Factura=data['data'];
      if (factura != null) {
        let precio: number = 0;
        factura.productos.forEach(producto => {
          precio += producto.importeUnitario * producto.unidades;
        });
        this.facturas.push(new FacturaMostrar(this.facturas[this.facturas.length-1].id+1, factura.cliente, factura.porcentajeIva, Number.parseFloat(precio.toFixed(2))));
      }
    });

    return await modal.present();

  }

  async elimina(indice: number) {
    if (await this.servicio.deleteFactura(this.facturas[indice].id))
      this.facturas.splice(indice, 1);
  }

}
