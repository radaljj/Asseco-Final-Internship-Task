import { Component, OnInit } from '@angular/core';
import { Transactions, PagedTransaction } from './transactions';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions:Transactions[]=[];
  transakcije:PagedTransaction[]=[];


    // { id: 1, name: "Ram" ,date:"26012021" ,direction:"gore strelica",amount:233345,currency:"RSD",split_marker:"nzstaeovo"},
   

  constructor() { }

  ngOnInit(): void {

    // let transakcijaPrva=new Transactions(1,"ime", new Date().toDateString(),"gore strela",32432423,"RSD","wtf");
    // this.transactions.push(transakcijaPrva);

    // let transakcijaJedan=new PagedTransaction(10,1,5,"desc","sortOrder",this.transactions);
    // this.transakcije.push(transakcijaJedan);




  }
  

}
