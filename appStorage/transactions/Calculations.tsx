import { transaction, transactionList } from "@/types/app.t"
import { getListFromStorage } from "./transactions"

export const getExpenseSummary = async ()=>{
    var income = 0
    var expenditure = 0

    const {success , data} = await getListFromStorage()

    if(success){
        const temp:transactionList = data
       

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
    else{
        return {income, expenditure , savings: income-expenditure}
    }
}

export const getPercentageSummary = async()=>{
    const {income , savings , expenditure} = await getExpenseSummary()

    if (expenditure<income){
        var incomeRatio = income/income 
        var expenseRatio = expenditure/income
        var savingsRatio = savings/income
        var lossRatio = 0
        return{
            incomePercentage: incomeRatio*100,
            expensePercentage: expenseRatio*100,
            savingsPercentage: savingsRatio*100,
            lossPercentage: lossRatio*100
        }
    }

    else{
        var loss = expenditure - income

        var incomeRatio = income/income 
        var expenseRatio = expenditure/income
        var savingsRatio = 0
        var lossRatio = loss/income

        return{
            incomePercentage: incomeRatio*100,
            expensePercentage: expenseRatio*100,
            savingsPercentage: savingsRatio*100,
            lossPercentage: lossRatio*100
        }
    }

    
}