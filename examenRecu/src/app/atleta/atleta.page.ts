import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Atleta } from '../modelos/Atleta';
import { Marca } from '../modelos/Marca';

@Component({
  selector: 'app-atleta',
  templateUrl: './atleta.page.html',
  styleUrls: ['./atleta.page.scss'],
})
export class AtletaPage implements OnInit {

  atleta: Atleta;
  tiempoMarcas: String[] = [];

  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.atleta = JSON.parse(params["atleta"]);
      console.log(this.atleta);
      console.log(this.atleta.marcas)
    });
  }

  ngOnInit() {
    let date: Date = new Date();
    this.atleta.marcas.forEach((marca: Marca) => {
      marca.distancia = marca.distancia / 1000;
      date.setHours(0, 0, 0, 0);
      date.setSeconds(marca.tiempo);
      this.tiempoMarcas.push(date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds())
      console.log(marca)
    });
  }

  volver() {
    this.navCtrl.back()
  }

}
