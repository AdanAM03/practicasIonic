import { LineaDetalle } from "./LineaDetalle";

export class FacturaNueva {
    public id: number;
    public cliente: String;
    public porcentajeIva: number;
    public productos: LineaDetalle[];
    public total: number;
    constructor() {
        
    }
}