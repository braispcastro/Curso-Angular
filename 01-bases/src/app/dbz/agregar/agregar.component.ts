import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent {

  @Input()
  nuevo: Personaje = { nombre: '', poder: 0 }

  constructor( private dbzService: DbzService ) { }

  agregar(): void {

    // Validation
    if (this.nuevo.nombre.trim().length < 1)
      return;

    this.dbzService.agregarPersonaje( this.nuevo );

    // Reset object
    this.nuevo = { nombre: '', poder: 0 }
  }

}
