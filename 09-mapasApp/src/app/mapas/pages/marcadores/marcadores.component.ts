import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";


interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-8.412482755925033, 43.362046973886834];

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.center[0], this.center[1]],
      zoom: this.zoomLevel
    });

    this.cargarMarcadoresLocalStorage();
  }

  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.mapa.getCenter())
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: newMarker
    });

    newMarker.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

    this.guardarMarcadoresLocalStorage();
  }

  goToMarker(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }

  deleteMarker(index: number) {
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1);
    this.guardarMarcadoresLocalStorage();
  }

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach(m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();
      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  cargarMarcadoresLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(item => {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: item.color
      })
      .setLngLat(item.centro!)
      .addTo(this.mapa);

      this.marcadores.push({
        color: item.color,
        marker: newMarker
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
    });
  }

}
