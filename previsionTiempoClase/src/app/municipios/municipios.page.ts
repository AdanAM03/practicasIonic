import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InterfaceMunicipio } from '../modelo/Interfaces';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.page.html',
  styleUrls: ['./municipios.page.scss'],
})
export class MunicipiosPage implements OnInit {

  public municipios:InterfaceMunicipio[]=new Array();

  constructor(private apiService: ApiServiceProvider, public navCtrl: NavController ) { }

  ngOnInit(): void {
    this.apiService.getMunicipios()
    .then((data:InterfaceMunicipio[])=>{
      this.municipios=data;
    })
    .catch((error:string)=>{
      console.log(error);
    });
  }//end_ngOnInit

  municipioSeleccionado(i: number) {
    console.log(this.municipios[i].codMunicipio)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        municipio: JSON.stringify(this.municipios[i].codProvincia + this.municipios[i].codMunicipio),
        nombreMun: JSON.stringify(this.municipios[i].municipio)
      }

    };
    this.navCtrl.navigateForward("home", navigationExtras)
  }

}
