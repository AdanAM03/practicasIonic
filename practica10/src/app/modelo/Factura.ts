import { LineaDetalle } from "./LineaDetalle";

export class Factura {
    public total: number;
    constructor(public id: Number, public cliente: String, public porcentajeIva: number, public productos: LineaDetalle[]) {
        
    }
}