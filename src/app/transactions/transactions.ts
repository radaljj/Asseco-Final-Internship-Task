export class Transactions {
  public id: number;

  public beneficiaryName: string;

  public date: Date;

  public direction: string;

  public amount: string;

  public currency: string;


  public description:string;
  public mcc:number;
  public kind:string;
  public catcode:string;


  constructor(
    id: number,
    beneficiaryName: string,
    date: Date,
    direction: string,
    amount: string,
    description:string,
    currency: string,
    subCategory: string,
    mcc:number,
    kind:string,
    catcode:string

  ) {
    this.id = id;
    this.beneficiaryName = beneficiaryName;
    this.date = date;
    this.direction = direction;
    this.amount = amount;
    this.currency = currency;
    this.description=description;
    this.mcc=mcc;
    this.kind=kind;
    this.catcode=catcode;


  }
}

export class PagedTransaction {
  public pageSize: number;
  public page: number;
  public totalCount: number;
  public sortBy: string;
  public sortOrder: string;
  public items: Transactions[];

  constructor(
    pageSize: number,
    page: number,
    totalCount: number,
    sortBy: string,
    sortOrder: string,
    items: Transactions[]
  ) {
    this.pageSize = pageSize;
    this.page = page;

    this.totalCount = totalCount;
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.items = items;
  }
}

export class Category{
  public code:string;
  public parentCode:string;
  public name:string;


  constructor(
    parentCode: string,
    code: string,
    name: string,


  ) {
    this.code = code;
    this.name = name;
    this.parentCode = parentCode;



  }
}



