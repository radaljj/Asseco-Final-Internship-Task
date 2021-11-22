import { TransactionService } from './../transaction.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2'; 
import { Category } from '../transactions/transactions';

@Component({


  
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  selected:any="";
  catcode: string | undefined;
  idTransakcije:any;
  vrednostForme:any;  
  form!: FormGroup;
  nizKategorija:Category[]=[];
  imeKategorijePovratak:string | undefined;
  brojacSelectova=0;

  subcategories:any = [
    
  ];



  constructor(public formBuilder: FormBuilder,
    private catServis:TransactionService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit() {
    console.log(this.data.item.id);
    this.brojacSelectova=this.data.brojacSelectova;
    this.idTransakcije=this.data.item.id;
   this.catServis.getCategories().subscribe(data=>{
    this.nizKategorija=data;
   });
    this.form = this.formBuilder.group({
      glavnaKategorija: '',
      podKategorija:''
    })

    
  }

  submit(form:any) {
    //POST METODA 

    this.idTransakcije=this.data.item.id;
    this.vrednostForme=form.value.glavnaKategorija;
    this.catServis.addNewCategory(this.idTransakcije,{"catcode":`${this.vrednostForme}` }).subscribe(res => {
      console.log(res);
      });

if(`${form.value.podKategorija}`!=""){

  for (let index = 0; index < this.nizKategorija.length; index++) {
    if(this.nizKategorija[index].code==`${form.value.podKategorija}`){
        this.imeKategorijePovratak=this.nizKategorija[index].name;
    }
   
  }


}else{

    for (let index = 0; index < this.nizKategorija.length; index++) {
      if(this.nizKategorija[index].code==`${form.value.glavnaKategorija}`){
          this.imeKategorijePovratak=this.nizKategorija[index].name;
      }
     
    }

  }
if(this.imeKategorijePovratak===undefined){
  swal.fire('Error', `Please select a category `, 'error')
}else{


    this.dialogRef.close(`${this.imeKategorijePovratak}`);
}
  
  }
  cuvanjeVrednosti() {

    console.log(this.selected);


}
}
