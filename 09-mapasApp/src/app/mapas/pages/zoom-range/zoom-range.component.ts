import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      position: fixed;
      left: 50px;
      padding: 10px;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  maxZoom: number = 18;
  center: [number, number] = [-8.412482755925033, 43.362046973886834];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.center[0], this.center[1]],
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => this.zoomLevel = ev.target.getZoom());

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > this.maxZoom) {
        this.mapa.zoomTo(this.maxZoom);
      }
    });

    this.mapa.on('move', (ev) => {
      const {lng, lat} = ev.target.getCenter();
      this.center = [lng, lat];
    });
  }

  ngOnDestroy() {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomChanged(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }

}
