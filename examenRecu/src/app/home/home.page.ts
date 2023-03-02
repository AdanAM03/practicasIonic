import { Component } from '@angular/core';
import { ApiServiceProvider } from '../api/api-service';
import { Atleta } from '../modelos/Atleta';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  atletas: Atleta[];
  lista: boolean;
  listaMuestra: boolean;
  eleccion: String = "lista";
  validations_form: FormGroup;

  constructor(private api: ApiServiceProvider, public formBuilder: FormBuilder, private navCtrl: NavController) {
    this.validations_form = this.formBuilder.group({
      dni: new FormControl(null, Validators.compose([
        Validators.pattern('(^[0-9]{8}[A-Z]{1}$)'),
        Validators.required
      ])),
      apellidos: new FormControl(null, Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.maxLength(50),
        Validators.minLength(1),
        Validators.required
      ])),
      nombre: new FormControl(null, Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.maxLength(30),
        Validators.minLength(1),
        Validators.required
      ])),
      edad: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

  }

  elegido(event) {
    console.log(event.target.value)
    this.eleccion = event.target.value;
  }

  async ngOnInit() {
    this.atletas = await this.api.getAtletas();
  }

  atletaElegido(indice) {    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        atleta: JSON.stringify(this.atletas[indice])
      }   
    };

    this.navCtrl.navigateForward("atleta", navigationExtras)
    
  }

  onSubmit(valores) {

  }
}
