import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/dbz.interface";


@Injectable()
export class DbzService {

    private _personajes: Personaje[] = [
        {
            nombre: 'Goku',
            poder: 15000
        },
        {
            nombre: 'Vegeta',
            poder: 7500
        }
    ];

    get personajes(): Personaje[] {
        // [...obj] para que retorne una nueva instancia del objeto y no sea manipulable desde fuera
        return [...this._personajes];
    }

    constructor() {
        console.log('Servicio inicializado...');
    }

    agregarPersonaje( personaje: Personaje ): void {
        this._personajes.push(personaje);
    }

}