

export const formatCurrency = (price:number , enableConcat=false)=>{
      //{currency:'₦' , number:String(price) , attachment:'NGN'} 
      if(price == 0){
        return `₦ ....`
      }
      if(price > 999999 && enableConcat){
        if(price < 1000000000){
            var degraded = price/1000000
            return `₦${degraded}M`
        }
        else if (price < 1000000000000){
            var degraded = price/1000000000
            return `₦${degraded}B`
        }
      }
      const data = Intl.NumberFormat('en-EN' , {style:'currency' ,currency:'NGN' , currencyDisplay:'narrowSymbol'}).format(price)

    return data    
}