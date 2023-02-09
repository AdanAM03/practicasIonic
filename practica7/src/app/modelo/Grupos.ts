import { Alumno } from "./Alumno";

export class Grupos {
    grupo: string;
    id: number;
    alumnos: Alumno[];

    constructor(public grupoC: string, public idC: number) {
        this.grupo = grupoC;
        this.id = idC;
        this.alumnos = []
    }
    
}