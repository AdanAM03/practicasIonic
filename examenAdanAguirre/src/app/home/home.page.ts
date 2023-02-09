import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Partido } from '../modelo/Partido';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;

  marcadorF: FormGroup;

  botones1: boolean = false;
  botones2: boolean = false;
  marc1: number = 0;
  marc2: number = 0;

  todo: boolean = true;
  marcador: boolean = false;

  equipoLocalValido: boolean = false;
  equipoVisitanteValido: boolean = false;
  camp1: String = "";
  camp2: String = "";
  nombresEquipo: String[] = ["SANTA CLARA", "SAFAUR", "BETIS ESPARTINAS", "SIDERAL", "FRESAS", "MAIRENA DEL ALJARAFE"];

  activForm: boolean = false;

    partidos: Partido[] = [{ "equipoLocal": "SANTA CLARA", "ptosLocal": 36, "equipoVisitante": "SAFAUR", "ptosVisitante": 62 },
    { "equipoLocal": "SIDERAL", "ptosLocal": 50, "equipoVisitante": "BETIS ESPARTINAS", "ptosVisitante": 46 },
  {"equipoLocal": "MAIRENA DEL ALJARAFE", "ptosLocal": 66, "equipoVisitante": "FRESAS", "ptosVisitante": 49}];


  constructor(private fb: FormBuilder, public alertController: AlertController) { 
    this.marcadorF= this.fb.group({
      marcadorVisitante: new FormControl(),
      marcadorLocal: new FormControl()
    });

    this.form = this.fb.group({
      equipoLocalInput: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      equipoVisitanteInput: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ]))
    });
  }

  onSubmitMarcador(form: any) {
    this.todo = true;
    this.partidos[this.partidos.length - 1].ptosLocal = form.marcadorLocal;
    this.partidos[this.partidos.length - 1].ptosVisitante = form.marcadorVisitante;
    this.marcador = false;
  }

  suma1L() {
    this.marc2++
  }

  suma2L() {
    this.marc2+=2
  }

  suma3L() {
    this.marc2+=3
  }

  botones1B() {
    if (this.botones1 == true)
      this.botones1 = false
    else
      this.botones1 = true
  }

  botones2B() {
    if (this.botones2 == true)
      this.botones2 = false
    else
      this.botones2 = true
  }
  
  suma1V() {
    this.marc1++
  }

  suma2V() {
    this.marc1+=2
  }

  suma3V() {
    this.marc1+=3
  }

  onSubmit(form: any) {
    for (let i = 0; i < this.nombresEquipo.length; i++) {
      if (this.nombresEquipo[i] == form.equipoLocalInput) {
        this.equipoLocalValido = true;
    }
      if (this.nombresEquipo[i] == form.equipoVisitanteInput) {
        this.equipoVisitanteValido = true;
      }
    }
    
    if (!this.equipoLocalValido)
      this.alertEquipInex("El equipo local no existe");
      
    else if (!this.equipoVisitanteValido)
      this.alertEquipInex("El equipo visitante no existe");
      
    else if (form.equipoLocalInput == form.equipoVisitanteInput)
      this.alertEquipInex("Los equipos no pueden ser los mismos")
    else {
    
      let todoOk = false
      for (let partido of this.partidos) {
        todoOk = true;
        if (partido.equipoLocal == form.equipoLocalInput && partido.equipoVisitante == form.equipoVisitanteInput) {
          this.alertEquipInex("El patido ya existe")
          todoOk = false;
          break;
        }
      }
      if (todoOk)
        this.alertConfirmar();
    
      todoOk = false;
    }
    this.equipoLocalValido = false;
    this.equipoVisitanteValido = false;
  }

  async alertConfirmar() {
    const alert = await this.alertController.create({
      header: "Confirmar",
      buttons: [
      {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.activForm = false;
            this.form.value.equipoLocalInput = "";
            this.form.value.equipoVisitanteInput = "";
            },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.activForm = false;
            this.partidos.push({ "equipoLocal": this.form.value.equipoLocalInput, "ptosLocal": 0, "equipoVisitante": this.form.value.equipoVisitanteInput, "ptosVisitante": 0 });
            this.camp1 = ""
            this.camp2 = ""
            },
        }
      ]
    });
    await alert.present();
  }


  async alertEquipInex(dato: String) {
    const alert = await this.alertController.create({
      header: "ERROR",
      message: "" + dato,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            },
        }
      ]
    });
    await alert.present();
  }
  
  desactiva() {
    if (this.activForm == false) {
      this.camp1 = ""
      this.camp2 = ""
    }
  }

  edicionMarcador($event: any) {
    console.log($event.target.value)
    this.todo = false;
    this.marcador = true;
    
  }
    

}
