import { Marca } from "./Marca";

export interface Atleta {
    id: number;
    apellidos: string;
    nombre: string;
    dni: string;
    federado: boolean;
    equipo: string;
    edad: number;
    telefonoTutor: string;
    marcas: Marca[];
}