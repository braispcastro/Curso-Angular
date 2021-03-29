import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from "rxjs/operators";

import { Pais, PaisFull } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [
  ]
})
export class SelectorComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  });

  // Llenar selectores
  regiones: string [] = [];
  paises: Pais[] = [];
  fronteras: Pais[] = [];

  // UI
  cargando: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambia la región
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( _ => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap(region => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
          this.paises = paises ?? [];
          this.cargando = false;
      });

    // Cuando cambia el país
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( _ => {
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap(pais => this.paisesService.getPaisPorCodigo(pais)),
        switchMap(pais => this.paisesService.getPaisesPorCodigos(pais?.borders!))
      )
      .subscribe(paises => {
          this.fronteras = paises ?? [];
          this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }

}
