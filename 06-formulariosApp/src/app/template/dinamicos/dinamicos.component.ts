import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormulario')
  miFormulario!: NgForm;

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Brais',
    favoritos: [
      { id: 1, nombre: 'Monkey Island' },
      { id: 2, nombre: 'The Day of the Tentacle' },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    console.log('formulario posteado');
  }

  agregar() {
    this.persona.favoritos.push(
      {
        id: this.persona.favoritos.length + 1,
        nombre: this.nuevoJuego
      }
    );

    this.nuevoJuego = '';
  }

  eliminar(i: number) {
    this.persona.favoritos.splice(i, 1);
  }

}
