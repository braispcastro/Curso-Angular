import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  nombreLower: string = 'brais';
  nombreUpper: string = 'BRAIS';
  nombreCompleto: string = 'brAIs cAsTrO';

  fecha: Date = new Date();

  constructor() { }

}
