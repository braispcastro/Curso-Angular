import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {

  color: string = 'red';
  mensaje: string = 'Este campo es obligatorio';

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  mostrarValidacion(campo: string): boolean {
    return this.miFormulario.get(campo)?.invalid || false;
  }

  cambiarColor() {
    this.color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }

}
