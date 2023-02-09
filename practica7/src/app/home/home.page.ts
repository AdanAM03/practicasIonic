import { Component } from '@angular/core';
import { Grupos } from '../modelo/Grupos';
import { ApiServiceProvider } from '../provider/alumnosProvider';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  gr: Grupos[] = [];

  constructor(private apiService: ApiServiceProvider) { }
  
  async ngOnInit(): Promise<void> { 
    try {
      this.gr = await this.apiService.getGrupos();
    } catch (e) {
      console.log("grupos")
    }
        
    try {
      for (let grupo of this.gr) {
        grupo.alumnos = await this.apiService.getAlumnosGrupo(grupo.id);
        console.log(grupo.alumnos)
      }
    } catch (e) {
      console.log("alumnos")
    }

    }
      
    
}


