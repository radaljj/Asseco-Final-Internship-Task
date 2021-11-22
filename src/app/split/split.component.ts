import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from '../transaction.service';
import swal from 'sweetalert2'; 
import { Category } from '../transactions/transactions';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss']
})
export class SplitComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,
    private catServis:TransactionService,
    public dialogRef: MatDialogRef<SplitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {    this.form = this.formBuilder.group({
      glavnaPrvaKategorija:'',
      podGlavnaKategorija:'',
      kolicinaGlavnaNovca:'',
    })
  }

    

  selected:any="";
  catcode: string | undefined;
  idTransakcije:any;
  oduzetaOdGlavne:any;
brojac=0;
  sumaTransakcije:string="";
  sumaTransakcijeTrim:any;
  prebacenaTrans:any;
  vrednostForme:any;  
  brojForme:any;
  form!: FormGroup;
  nizKategorija:Category[]=[];
  imeKategorijePovratak:string | undefined;
  ngOnInit() {
    this.idTransakcije=this.data.item.id;
    this.sumaTransakcije=this.data.item.amount;
   this.catServis.getCategories().subscribe(data=>{
     console.log(data);
    this.nizKategorija=data;
   });

   
 
  }

 
  submit(form:any) {
    //POST METODA 

    this.sumaTransakcijeTrim=this.sumaTransakcije.substring(1);
    this.prebacenaTrans=parseFloat(this.sumaTransakcijeTrim);
    this.vrednostForme=form.value.glavnaPrvaKategorija;
    this.brojForme=form.value.kolicinaGlavnaNovca;

    this.catServis.splitTransaction(this.idTransakcije,{"splits": [
      {
        "catcode": `${this.vrednostForme}`,
        "amount": this.brojForme
      }
    ]}).subscribe(res => {
      console.log(res);
      });

      console.log(this.prebacenaTrans- this.brojForme );

     

if(`${form.value.podGlavnaKategorija}`!=""){

  for (let index = 0; index < this.nizKategorija.length; index++) {
    if(this.nizKategorija[index].code==`${form.value.podGlavnaKategorija}`){
        this.imeKategorijePovratak=this.nizKategorija[index].name;
    }
   
  }


}else{

    for (let index = 0; index < this.nizKategorija.length; index++) {
      if(this.nizKategorija[index].code==`${form.value.glavnaPrvaKategorija}`){
          this.imeKategorijePovratak=this.nizKategorija[index].name;
      }
     
    }

  }

if(this.imeKategorijePovratak===undefined|| this.brojForme>this.prebacenaTrans){
  swal.fire('Error', `Please check your form inputs `, 'error')
}else{

  this.oduzetaOdGlavne=this.prebacenaTrans-this.brojForme
  swal.fire('Transaction is successfully split!', `New category ${this.imeKategorijePovratak} is added and the amount for this category is: €${this.brojForme} ` , 'success')
  this.dialogRef.close(`(€${this.oduzetaOdGlavne}) •${this.imeKategorijePovratak} (€${this.brojForme})`);
}
  
  }



}


