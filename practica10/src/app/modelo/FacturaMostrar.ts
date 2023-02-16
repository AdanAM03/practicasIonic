import { LineaDetalle } from "./LineaDetalle";

export class FacturaMostrar {
    
    constructor(public id: number,
    public cliente: String,
    public porcentajeIva: number,
    public total: number) {
        
    }
}