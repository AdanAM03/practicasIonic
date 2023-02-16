import { LineaDetalle } from "./LineaDetalle";

export class Factura {
    public id: number;
    public cliente: String;
    public porcentajeIva: number;
    public productos: LineaDetalle[];
    constructor() {
        
    }
}