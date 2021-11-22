import { ChartComponent } from './../chart/chart.component';
import { DialogComponent } from './../dialog/dialog.component';
import { TransactionService } from './../transaction.service';
import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal} 
      from '@ng-bootstrap/ng-bootstrap';
      import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { SplitComponent } from '../split/split.component';
import { Transactions } from '../transactions/transactions';


@Component({
  selector: 'table-selection-example',
  styleUrls: ['my-table.component.scss'],
  templateUrl: 'my-table.component.html',
})


export class MyTableComponent  implements AfterViewInit  {
  transakcijeNiz:Transactions[]=[];
  selectedValue = null;
  closeResult = '';
  dugmici:boolean | undefined;
  dugmici1:boolean | undefined;
  selectedCat='';
  dropDownResponse:any = [];
  brojac=0;
  brojac1=0;
 nizTransakcija: Transactions[] = [];
  fileNameDialogRef: MatDialogRef<DialogComponent> | undefined;
  fileNameDialogSplitRef: MatDialogRef<SplitComponent> | undefined;
  fileNameDialogRefChart: MatDialogRef<ChartComponent> | undefined;

  brojacSelectova=0;

  flag : number=0;
  
  cuvanjeIdNiz : number[]=[];
  prviElementTrans : Transactions[]=[];
  pomocna: number[]=[];


  constructor(private dialog: MatDialog,private modalService: NgbModal,private transactionService:TransactionService,private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  ngOnInit(): void {


  this.transactionService.getTransactions1().subscribe((transakcije:Transactions[])=>{
    console.log(transakcije);
    this.dropDownResponse=transakcije;
    this.dataSource.data=transakcije;
    this.nizTransakcija=transakcije;
    this.prviElementTrans[0]=transakcije[0];

  })

  
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;  
    this.dataSource.sort = this.sort!;
    

  }
  displayedColumns: string[] = ['imageUrl','row1', 'row2','strelice'];

  dataSource = new MatTableDataSource<Transactions>(this.nizTransakcija);
  selection = new SelectionModel<Transactions>(true, []);


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  openChart(){
    this.fileNameDialogRefChart = this.dialog.open(ChartComponent);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Transactions): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }



  uzmiIdeve(){
    
    this.flag=1;
    for (let index = 0; index < this.nizTransakcija.length; index++) {
      if(this.selection.isSelected(this.nizTransakcija[index])){
          this.cuvanjeIdNiz.push(this.nizTransakcija[index].id);
      }

      
    }
    this.brojacSelectova=this.cuvanjeIdNiz.length;
    console.log(this.brojacSelectova);

  }
  filterKind($event:any){

    let filteredData = _.filter(this.dropDownResponse,(item:any) =>{
      return item.kind.toLowerCase() ==  $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator!;  
    this.dataSource.sort = this.sort!;
  }

 
  closeSelect(){
    this.displayedColumns = this.displayedColumns.filter(e => e !== 'select'); 
    this.dugmici=false;
    this.brojac=0;

  }

  div1Function(){
   this.dugmici=true;
}
div1Function2(){
  this.dugmici1=true;
}


reload(){
  location.reload();

}



otvoriPopUpKategorije(item:Transactions) {


  let config: MatDialogConfig = {

  data: {
item
  }
};
  this.fileNameDialogRef = this.dialog.open(DialogComponent,config);

  this.fileNameDialogRef.afterClosed().pipe(
    filter(vracenaKategorija => vracenaKategorija)
  ).subscribe(vracenaKategorija => {

   
    if(this.flag==1){
      
      for (let i = 0; i < this.nizTransakcija.length; i++) {
        for (let j = 0; j < this.cuvanjeIdNiz.length; j++) {
          if(this.nizTransakcija[i].id==this.cuvanjeIdNiz[j]){
            this.nizTransakcija[i].catcode=vracenaKategorija;
          }
          
        }
        
      }
      this.flag=0;
      this.cuvanjeIdNiz.length=0;
    }else{
  
    
  let index = this.nizTransakcija.indexOf(item);

  item.catcode = vracenaKategorija;

  //this.nizTransakcija[index].catcode=vracenaKategorija;
  
    console.log(vracenaKategorija);
    }
    
  })
}


otvoriPopUpTransakcije(item:Transactions){

  let config: MatDialogConfig = {

    data: {
  item
    }
  };
  this.fileNameDialogSplitRef = this.dialog.open(SplitComponent,config);

  this.fileNameDialogSplitRef.afterClosed().pipe(
    filter(vracenaKategorija => vracenaKategorija)
  ).subscribe(vracenaKategorija => {
   
if(item.catcode==undefined){
  item.catcode=vracenaKategorija;
}else{
    item.catcode +=vracenaKategorija;
}
  
    
      console.log(vracenaKategorija);
    
  })



}



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  openSearch(){
this.brojac1++;
  this.div1Function2();
  if(this.brojac1%2!=1){
    this.dugmici1=false;
  }
  }

  

  openSelect(){
  this.brojac++;
  this.div1Function();
  if(this.brojac % 2 == 1 ){
this.displayedColumns.unshift('select');
  }else{
    this.displayedColumns = this.displayedColumns.filter(e => e !== 'select'); 

  }
  
  }


}
