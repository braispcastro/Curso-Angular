import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = [
    // 'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Others'
  ];
  public doughnutChartData: MultiDataSet = [
    // [350, 450, 100, 150]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [ { backgroundColor: ['#A7B3E8', '#AECDF2', '#AACEDC', '#AEF1F2', '#A7E8D7'] } ];
  
  constructor(private graficasService: GraficasService) { }

  ngOnInit(): void {

    // this.graficasService.getUsuariosRedesSociales()
    //   .subscribe(data => {
    //     this.doughnutChartLabels = Object.keys(data);
    //     this.doughnutChartData = Object.values(data);
    //   });

    this.graficasService.getUsuariosRedesSocialesParsed()
      .subscribe(({labels, values}) => {
        this.doughnutChartLabels = labels;
        this.doughnutChartData = values;
      });

  }

}
