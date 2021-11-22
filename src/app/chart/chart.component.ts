import { Category } from './../transactions/transactions';
import { TransactionService } from './../transaction.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MatDialogRef } from '@angular/material/dialog';
import { Transactions } from '../transactions/transactions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  name = 'Angular';
  someData: any[] = [];


  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: { chart: { data: { labels: { [x: string]: any; }; }; }; dataIndex: string | number; }) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Misc Expenses', 'Auto & Transport', 'Bills & Utilities','Education', 'Entertainment','Fees & Charges','Financial','Gifts & Donations'];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(149, 221, 79, 0.8)',
        'rgba(192, 99, 58, 0.8)',
        'rgba(73, 13, 105, 0.8)',
        'rgba(8, 7, 8, 0.8)',
      ]
    },
  ];
  //public pieChartData: number[] = [300, 500, 100];
  public pieChartData: number[] = [];
  kategorijeNIz:Category[]=[];

brojacA:number=0;
brojacB:number=0;
brojacC:number=0;
brojacD:number=0;
brojacE:number=0;
brojacF:number=0;
brojacG:number=0;
brojacH:number=0;




  constructor(private catServis:TransactionService,public dialogRef: MatDialogRef<ChartComponent>) { }

  ngOnInit() {
    setTimeout(() => {

      this.catServis.getCategories().subscribe((kategorije:Category[])=>{
        this.someData=kategorije;
        this.kategorijeNIz=kategorije;
        this.brojanjeGlavnihKategorija();
        this.someData = [this.brojacA,this.brojacB,this.brojacC,this.brojacD,this.brojacE,this.brojacF,this.brojacG,this.brojacH];
        this.pieChartData = this.someData;

        console.log(this.brojacD);

      });
      
    }, 2000);
  }

brojanjeGlavnihKategorija(){
  for (let index = 0; index < this.kategorijeNIz.length; index++) {
    if(this.kategorijeNIz[index].parentCode=="A"){
this.brojacA++;
    }else if(this.kategorijeNIz[index].parentCode=="B"){
this.brojacB++;
    }else if(this.kategorijeNIz[index].parentCode=="C"){
this.brojacC++;
    }else if(this.kategorijeNIz[index].parentCode=="D"){
this.brojacD++;
    }else if(this.kategorijeNIz[index].parentCode=="E"){
this.brojacE++;
    }else if(this.kategorijeNIz[index].parentCode=="F"){
      this.brojacF++;
      }else if(this.kategorijeNIz[index].parentCode=="G"){
        this.brojacG++;
        }else if(this.kategorijeNIz[index].parentCode=="H"){
          this.brojacH++;
          }

    
  }
}



}
