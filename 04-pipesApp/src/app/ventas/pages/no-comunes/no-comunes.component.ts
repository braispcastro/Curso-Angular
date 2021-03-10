import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent {

  // i18nSelect
  nombre: string = 'Brais';
  genero: string = 'masculino';
  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

  // i18nPlural
  clientes: string[] = [ 'María', 'Pedro', 'Juan', 'Susana', 'Alberto', 'Sandra' ];
  clientesMapa = {
    '=0': 'no tenemos ningún cliente',
    '=1': 'tenemos un cliente',
    'other': 'tenemos # clientes'
  }

  // KeyValue Pipe
  persona = {
    nombre: 'Brais',
    edad: 30,
    direccion: 'A Coruña, Galicia'
  }

  // JSON Pipe
  heroes= [
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre: 'Robin',
      vuela: false
    },
    {
      nombre: 'Aquaman',
      vuela: false
    }
  ]

  // Async Pipe
  miObservable = interval(2000);
  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de promesa');
    }, 3500);
  });

  constructor() { }

  cambiarPersona(): void {
    if (this.genero == 'masculino') {
      this.genero = 'femenino';
      this.nombre = 'Emma';
    }
    else {
      this.genero = 'masculino';
      this.nombre = 'Brais';
    }
  }

  borrarCliente(): void {
    this.clientes.pop();
  }

}
