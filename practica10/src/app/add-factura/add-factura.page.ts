import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AddProdcutoPage } from '../add-prodcuto/add-prodcuto.page';
import { ApiServiceProvider } from '../api/ApiService';
import { Cliente } from '../modelo/Cliente';
import { Factura } from '../modelo/Factura';
import { FacturaMostrar } from '../modelo/FacturaMostrar';
import { LineaDetalle } from '../modelo/LineaDetalle';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.page.html',
  styleUrls: ['./add-factura.page.scss'],
})
export class AddFacturaPage implements OnInit {
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente;
  total: number;
  lin: LineaDetalle[] = [];
  iva: number;
  totalSinIva: number;
  validations_form: FormGroup;
  

  constructor(public formBuilder: FormBuilder, public servicio: ApiServiceProvider, public alertController: AlertController, public modalController: ModalController) { 
    this.validations_form = this.formBuilder.group({
      cliente: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      iva: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }

  async ngOnInit() {
    this.clientes = await this.servicio.getClientes();
  }

  volver() {
    this.modalController.dismiss(null);
  }

  clienteElegido(event: any) {
    this.clientes.forEach(cl => {
      if (cl.cliente == event.target.value)
        this.clienteSeleccionado = cl;
    });
    console.log(this.clienteSeleccionado);
  }

  async addProducto() {
    const modal = await this.modalController.create({
      component: AddProdcutoPage
    });

    modal.onDidDismiss().then((data) => {
      let lienaProducto:LineaDetalle=data['data'];
      if (lienaProducto != null) {
        this.lin.push(lienaProducto);
        this.totalSinIva = lienaProducto.importeUnitario * lienaProducto.unidades;
        this.recalcula();
      }
    });

    return await modal.present();

  }

  recalcula() {
    if (this.lin.length > 0) {
      this.total = this.totalSinIva + (this.totalSinIva * (this.iva / 100));
    }
  } 
  
  onSubmit(values: any) {
    let f: Factura = new Factura();
    f.id = null;
    f.cliente = this.clienteSeleccionado.cliente;
    f.porcentajeIva = this.iva;
    f.productos = this.lin;
    
    this.servicio.addFactura(f);
    this.modalController.dismiss(f);
  }

}
