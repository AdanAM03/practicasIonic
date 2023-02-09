import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grupos } from '../modelo/Grupos';
@Injectable()
export class ApiServiceProvider {

    constructor(public http: HttpClient) {
    }


    async getGrupos() {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get("http://localhost:3000/grupos").toPromise()
                .then((data: any) => {
                    data = data.map((g:any)=>{return g})
                    resolve(data);
                })
                .catch((error: Error) => {
                    reject(error.message);
                })
        });
        
        return promise;
    }//end_getPrevisionDiariaMunicipio

    async getAlumnosGrupo(idGrupo: number): Promise<any>{
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get('http://localhost:3000/alumnos?idGrupo=' + idGrupo).toPromise()
                .then((data: any) => {
                    resolve(data);
                    })
                .catch((error: Error) => {
                        reject(error.message);
                    })
                });
        return promise;
    }

}//end_class