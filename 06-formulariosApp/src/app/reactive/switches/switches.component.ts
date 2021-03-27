import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuardsCheckStart } from '@angular/router';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    });
  }

  guardar() {
    if (this.miFormulario.invalid) {
      return;
    }

    console.log(this.miFormulario.value);
    this.resetForm();
  }

}
