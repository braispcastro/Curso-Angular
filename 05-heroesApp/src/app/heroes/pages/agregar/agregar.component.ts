import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius:5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor( 
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    // Esto tiene sus problemas, pero lo dejo así porque es el curso y tampoco me voy a rayar
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroeService.getHeroeById(id))
        )
        .subscribe((heroe) => this.heroe = heroe);
    }

  }

  guardar() {
    
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe( heroe => {
          this.mostrarSnackbar('Registro actualizado...');
        });
    }
    else {
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Registro creado...');
        });
    }
    
  }

  borrarHeroe() {
    this.heroeService.borrarHeroe(this.heroe.id!)
      .subscribe( resp => {
        this.router.navigate(['/heroes']);
      });
  }

  mostrarSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }

}
