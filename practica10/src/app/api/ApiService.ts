import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../modelo/Factura';
import { Cliente } from '../modelo/Cliente';
import { Producto } from '../modelo/Producto';

@Injectable()
export class ApiServiceProvider {

    constructor(public http: HttpClient) {
    }


    async getFacturas() {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get("http://localhost:3000/facturas").toPromise()
                .then((data: any) => {
                    data = data.map((f: Factura) => { return f });
                    resolve(data);
                })
                .catch((error: Error) => {
                    reject(error.message);
                })
        });
        
        return promise;
    }

    async getClientes() {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get('http://localhost:3000/clientes').toPromise()
                .then((data: any) => {
                    data = data.map((c: Cliente) => { return c });
                    resolve(data);
                    })
                .catch((error: Error) => {
                        reject(error.message);
                    })
                });
        return promise;
    }

    async getProductos() {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get('http://localhost:3000/productos').toPromise()
                .then((data: any) => {
                    data = data.map((p: Producto) => { return p });
                    resolve(data);
                    })
                .catch((error: Error) => {
                        reject(error.message);
                    })
                });
        return promise;
    }

    async getFacturasCliente(cliente: String) {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get('http://localhost:3000/facturas?cliente=' + cliente).toPromise()
                .then((data: any) => {
                    data = data.map((f: Factura) => { return f });
                    resolve(data);
                    })
                .catch((error: Error) => {
                        reject(error.message);
                    })
                });
        return promise;
    }

    async getProducto(id: Number) {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get('http://localhost:3000/productos?id=' + id).toPromise()
                .then((data: any) => {
                    data = data.map((p: Producto) => { return p });
                    resolve(data);
                    })
                .catch((error: Error) => {
                        reject(error.message);
                    })
                });
        return promise;
    }

}