import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceMunicipio, InterfacePrevisionDiariaMunicipio } from 'src/app/modelo/Interfaces';

@Injectable()
export class ApiServiceProvider {

    private URL = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/";
    private API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFuLmFndWlycmUubWVkaW5hLmFsdUBpZXNqdWxpb3Zlcm5lLmVzIiwianRpIjoiNTQ0ZGE5OTEtMDVmMC00ZWUzLWIxOTQtYjg5ZTZhNmQ2NjdjIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzQxMTYxNDUsInVzZXJJZCI6IjU0NGRhOTkxLTA1ZjAtNGVlMy1iMTk0LWI4OWU2YTZkNjY3YyIsInJvbGUiOiIifQ.rqvtMHXqTJ6GPdX7OIYSvlRIgMKu_4GtpDWPc0D4Z3o";


    constructor(public http: HttpClient) {
    }


    getPrevisionDiariaMunicipio(municipio:String): Promise<InterfacePrevisionDiariaMunicipio[]> {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get(this.URL + municipio + "/?api_key=" + this.API_KEY).toPromise()
                .then((data: any) => {
                    console.log(data);
                    this.http.get(data['datos']).toPromise()
                    .then((data:any)=>{
                        resolve(data);
                    })
                    .catch((error: Error) => {
                        reject(error.message);
                    })
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getPrevisionDiariaMunicipio

    getMunicipios(): Promise<any>{
        let promise = new Promise<InterfaceMunicipio[]>((resolve, reject) => {
            this.http.get('./assets/json/municipios.json').toPromise()
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