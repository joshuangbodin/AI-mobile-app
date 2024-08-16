export interface user{
    name : string ;
    password : string ;
    appLock : boolean ; 
    dateCreated : string;
}


export interface transaction{
    type:'income'|'expenditure',
    category: string;
    name:string;
    description:string;
    amount:string;
    dateCreated: string;
}



export interface transactionList{

}


