import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/ApiService';
import { LineaDetalle } from '../modelo/LineaDetalle';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-add-prodcuto',
  templateUrl: './add-prodcuto.page.html',
  styleUrls: ['./add-prodcuto.page.scss'],
})
export class AddProdcutoPage implements OnInit {

  productos: Producto[] = [];
  lienaProducto: LineaDetalle;
  validations_form: FormGroup;
  
  constructor(public formBuilder: FormBuilder, private apiService: ApiServiceProvider, public modalCtrl: ModalController) {
    this.validations_form = this.formBuilder.group({
      cant: new FormControl(null, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.required,
        Validators.min(1)
      ])),
      prod: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }

  async ngOnInit() {
    this.productos = await this.apiService.getProductos(); 
    
  }

  public closeModal() {
    this.modalCtrl.dismiss();  //se cancela la edición. No se devuelven datos.
  }

  onSubmit(values: any) {
    let i: number = 0;
    this.productos.forEach(p => {
      if (p.descripcion == values['prod']) {
        i = p.importeUnitario;
      }
    });
    this.lienaProducto = new LineaDetalle(values['prod'], i, values['cant'])

    this.modalCtrl.dismiss(this.lienaProducto);
  }


}
