import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  Category, Transactions } from './transactions/transactions';




@Injectable({
  providedIn: 'root'
})

export class TransactionService {


  

  constructor(private httpClient:HttpClient) {
   }

  public getTransactions1() : Observable<Transactions[]>  {
   
    return this.httpClient.get<any>('http://127.0.0.1:4010/transactions').pipe(
      map((response)=>{
         return response.items.map((odgovorJson: { [x: string]: any; id: any; date: any; direction: any; amount: any; description: any; currency: any; mcc: any; kind: any; category: any; }) =>({
          id: odgovorJson.id,
          beneficiaryName: odgovorJson['beneficiary-name'],
          date: odgovorJson.date,
          direction: odgovorJson.direction,
          amount: odgovorJson.amount,
          description:odgovorJson.description,
          currency:odgovorJson.currency,
          mcc:odgovorJson.mcc,
          kind:odgovorJson.kind




        }))
      })
    );
  }



public addNewCategory(id:any,data:any):Observable<any>{
     
  const url=`http://127.0.0.1:4010/transaction/${id}/categorize`;
  return this.httpClient.post<Transactions>(url,data);
}



public splitTransaction(id:any,data:any):Observable<any>{
     
  const url=`http://127.0.0.1:4010/transaction/${id}/split`;
  return this.httpClient.post<Transactions>(url,data);
}


public getCategories() : Observable<Category[]>  {
   
  return this.httpClient.get<any>('http://127.0.0.1:4010/categories').pipe(
    map((response)=>{
       return response.items.map((odgovorJson: { [x: string]: any; code: any;  name: any;}) =>({
        code: odgovorJson.code,
        parentCode: odgovorJson['parent-code'],
        name: odgovorJson.name




      }))
    })
  );
}











// public proba(){
//   return this.httpClient.get('http://127.0.0.1:4010/categories')
//   .pipe(map((res:any)=>{

//     console.log(res);
//     return res.items?.filter((post: { items: { [x: string]: null; }; })=>{
// return post.items['parent-code']=='B';
//     });

//   }));
// }





}
interface GetTransInterface {
 
  items: Transactions[];
}


  

   
  

