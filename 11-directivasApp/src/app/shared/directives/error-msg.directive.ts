import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit {

  private _message: string = 'Este campo es requerido';
  private _color: string = 'red';
  private _invalid: boolean = false;

  htmlElement: ElementRef<HTMLElement>;

  @Input() set message(valor: string) {
    this._message = valor;
    this.htmlElement.nativeElement.innerText = this._message;
  }

  @Input() set color(valor: string) {
    this._color = valor;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  @Input() set invalid(valor: boolean) {
    this._invalid = valor;
    if (valor) {
      this.htmlElement.nativeElement.classList.remove('hidden');
    } else {
      this.htmlElement.nativeElement.classList.add('hidden');
    }
  }
  

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.htmlElement = elementRef;
  }
  
  ngOnInit(): void {
    this.htmlElement.nativeElement.classList.add('form-text');
    this.htmlElement.nativeElement.style.color = this._color;
    this.htmlElement.nativeElement.innerText = this._message;
  }

}
