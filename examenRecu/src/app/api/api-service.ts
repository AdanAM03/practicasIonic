import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rejects } from 'assert';
import { Atleta } from '../modelos/Atleta';

@Injectable()
export class ApiServiceProvider {
  // Coloca la url correctamente
    private URL = 'http://localhost:3000';

    constructor(public http: HttpClient) { }

    async getAtletas(): Promise<Atleta[]> {
        let promise = new Promise<Atleta[]>((resolve, reject) => {
            this.http
            .get(this.URL + '/atletas')
            .toPromise()
            .then((data: any) => {
                let atletas = new Array<Atleta>();
                data.forEach((atleta: Atleta) => {
                    atletas.push(atleta);
                });
                resolve(atletas);
            })
            .catch((error: Error) => {
                reject(error.message);
            });
        });
        return promise;
    }
}