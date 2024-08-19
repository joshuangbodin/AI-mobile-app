import { transaction, transactionList } from "@/types/app.t"
import { getListFromStorage } from "./transactions"

export const getExpenseSummary = async ()=>{
    var income = 0
    var expenditure = 0

    const {success , data} = await getListFromStorage()

    if(success){
        const temp:transactionList = data
        console.log(temp)

        temp.list.forEach(
            (transactions:transaction) =>{
                if(transactions.type == 'expenditure'){
                    expenditure = expenditure+ Number(transactions.amount)
                }else{

                    income = income + Number(transactions.amount)
                }
            }
        )


        //console.log({income, expenditure , savings: income-expenditure})
        return {income, expenditure , savings: income-expenditure}

    }
}