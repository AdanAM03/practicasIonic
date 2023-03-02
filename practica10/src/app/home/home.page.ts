import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/ApiService';
import { FacturaNueva } from '../modelo/FacturaNueva';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  facturas: FacturaNueva[] = [];
  
  constructor(public servicio: ApiServiceProvider, public navCtrl: NavController) { }
  
  async ngOnInit(): Promise<void> { 
    this.facturas = await this.servicio.getFacturas();

    this.facturas.forEach(factura => {
      let precio: number = 0;
      factura.productos.forEach(producto => {
        precio += producto.importeUnitario * producto.unidades;
      });
      precio *= (factura.porcentajeIva / 100);
      factura.total = precio
    });
  }

  nuevaFactura() {
    this.navCtrl.navigateForward("add-factura");
  }

  async elimina(indice: number) {
    if (await this.servicio.deleteFactura(this.facturas[indice].id))
      this.facturas.splice(indice, 1);
  }

}
