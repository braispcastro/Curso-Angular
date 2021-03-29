import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  get emailErrorMessage(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'El campo email es obligatorio';
    }
    else if (errors?.pattern) {
      return 'El valor introducido no es un email';
    }
    else if (errors?.emailUsado) {
      return 'El email ya está siendo usado';
    }
    else {
      return '';
    }
  }
  
  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_repeat: ['', [Validators.required]]
  }, {
    validators: [this.validatorService.camposIguales('password', 'password_repeat')]
  });


  constructor(private formBuilder: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Brais Castro',
      email: 'test1@test.com',
      username: 'braiscastro',
      password: '123456',
      password_repeat: '123456'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  }

  emailYaUsado() {
    return this.miFormulario.get('email')?.errors?.emailUsado && this.miFormulario.get('email')?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
