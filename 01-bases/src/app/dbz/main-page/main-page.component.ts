import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  constructor() { }

  // Init insert object
  nuevo: Personaje = { nombre: 'Trunks', poder: 5000 }

}
