import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { Libro } from '../modelo/Libro';


@Injectable()
export class ApiServiceProvider {
    url:String = "http://localhost:3000/";
    constructor(public http: HttpClient) {
    }

    async getLibrosUsuario(id: number) {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get(this.url + "libros?idUsuarioPrestamo=" + id).toPromise()
                .then((data: any) => {
                    data = data.map((l: Libro) => { return l });
                    resolve(data);
                })
                .catch((error: Error) => {
                    resolve(null);
                })
        });

        return promise;
    }

    async modificaLibro(l: Libro) {
        let promise = new Promise<any>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(l);
            this.http.put(this.url + "libros/"+l.id, datos,
                header).toPromise().then(
                    (data: any) => { // Success
                        resolve(true);
                    }
                )
                .catch((error: Error) => {
                    resolve(false);
                });
        });
        return promise;
    }

    async getUsuario(id:number) {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get(this.url + "usuarios/" + id).toPromise()
                .then((data: any) => {
                    resolve(data);
                })
                .catch((error: Error) => {
                    resolve(null);
                })
        });
        
        return promise;
    }

    async getUsuarios() {
        let promise = new Promise<Usuario[]>((resolve, reject) => {
            this.http.get(this.url + "usuarios").toPromise()
                .then((data: any) => {
                    data = data.map((u: Usuario) => { return u });
                    resolve(data);
                })
                .catch((error: Error) => {
                    reject(error.message);
                })
        });
        
        return promise;
    }

    async getLibroTitulo(titulo: String) {
        let promise = new Promise<Libro[]>((resolve, reject) => {
            this.http.get(this.url + 'libros?titulo_like=' + titulo ).toPromise()
                .then((data: any) => {
                    data = data.map((l: Libro) => { return l });
                    resolve(data);
                    })
                .catch((error: Error) => {
                    reject(error.message);
                })
            });
        return promise;
    }

    async getLibroId(id: number) {
        let promise = new Promise<Libro[]>((resolve, reject) => {
            this.http.get(this.url + 'libros?id=' + id ).toPromise()
                .then((data: any) => {
                    data = data.map((l: Libro) => { return l });
                    resolve(data);
                    })
                .catch((error: Error) => {
                    reject(error.message);
                })
            });
        return promise;
    }

    async getLibros() {
        let promise = new Promise<Libro[]>((resolve, reject) => {
            this.http.get(this.url + 'libros').toPromise()
                .then((data: any) => {
                    data = data.map((l: Libro) => { return l });
                    resolve(data);
                    })
                .catch((error: Error) => {
                        reject(error.message);
                    })
                });
        return promise;
    }

}