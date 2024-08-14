export interface user{
    name : string ;
    password : string ;
    appLock : boolean ; 
    dateCreated : string;
}


export interface transaction{
    category: string;
    name:string;
    description:string;
    amount:number;
    dateCreated: string;
}




