

export const formatCurrency = (price:number)=>{
      //{currency:'₦' , number:String(price) , attachment:'NGN'} 

      const data = Intl.NumberFormat('en-EN' , {style:'currency' ,currency:'NGN' , currencyDisplay:'narrowSymbol'}).format(price)

    return data    
}