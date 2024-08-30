export interface user{
    name : string ;
    password : string ;
    appLock : boolean ; 
    dateCreated : Date;
}


export interface transaction{
    type:'income'|'expenditure',
    category: string;
    name:string;
    description:string;
    amount:string;
    dateCreated: Date;
}



export interface transactionList{
    list: transaction[]
}


