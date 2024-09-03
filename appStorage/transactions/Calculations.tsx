import { transaction, transactionList } from "@/types/app.t";
import { getListFromStorage } from "./transactions";

export const getExpenseSummary = async () => {
  var income = 0;
  var expenditure = 0;

  const { success, data } = await getListFromStorage();

  if (success) {
    const temp: transactionList = data;

    temp.list.forEach((transactions: transaction) => {
      if (transactions.type == "expenditure") {
        expenditure = expenditure + Number(transactions.amount);
      } else {
        income = income + Number(transactions.amount);
      }
    });
    //console.log({income, expenditure , savings: income-expenditure})
    return { income, expenditure, savings: income - expenditure };
  } else {
    return { income, expenditure, savings: income - expenditure };
  }
};

export const getPercentageSummary = async () => {
  const { income, savings, expenditure } = await getExpenseSummary();

  if (income == 0 && savings == 0 && expenditure == 0) {
    return {
      incomePercentage: 0,
      expensePercentage: 0,
      savingsPercentage: 0,
      lossPercentage: 0,
    };
  }

  if (expenditure < income) {
    var incomeRatio = income / income;
    var expenseRatio = expenditure / income;
    var savingsRatio = savings / income;
    var lossRatio = 0;
    return {
      incomePercentage: incomeRatio * 100,
      expensePercentage: expenseRatio * 100,
      savingsPercentage: savingsRatio * 100,
      lossPercentage: lossRatio * 100,
    };
  } else {
    var loss = expenditure - income;

    var incomeRatio = income / income;
    var expenseRatio = expenditure == 0 ? 0 : 1;
    var savingsRatio = 0;
    var lossRatio = loss / income;

    return {
      incomePercentage: incomeRatio * 100,
      expensePercentage: expenseRatio * 100,
      savingsPercentage: savingsRatio * 100,
      lossPercentage: lossRatio * 100,
    };
  }
};

const getHighestTransaction = async (type: "income" | "expenditure") => {
  var highest: transaction = {
    name: "",
    type: "income",
    dateCreated: new Date(),
    description: "",
    category: "",
    amount: "",
  };
  var current = 0;

  const { success, data } = await getListFromStorage();

  if (success) {
    const temp: transactionList = data;
    const { list } = temp;

    list.forEach((transaction: transaction) => {

      if (Number(transaction.amount) > current && transaction.type == type) {
        current = Number(transaction.amount);
        highest = transaction;
      }

    });

    return { success: true, data: highest };
  } else {
    return { success: false, data: highest };
  }
};

const getTransactionCount = async()=>{
    var income=0 ; var expense=0

    const { success, data } = await getListFromStorage();

    if(success){
        const temp: transactionList = data;
        const { list } = temp;

        list.forEach(
            (transaction:transaction)=>{
                if(transaction.type == 'income'){
                    income++;
                }
                else{
                    expense++
                }
            }
        )
        return {income , expense }
    }
    else{
        return {income ,expense}
    }

}

export const getFullAnalytics = async () => {
  var highestIncome: transaction;
  var highestExpenditure: transaction;
  var noOfExpenses: number;
  var noOfIncome: number;


    highestExpenditure = (await getHighestTransaction('expenditure')).data
    highestIncome = (await getHighestTransaction('income')).data
    noOfExpenses = (await getTransactionCount()).expense
    noOfIncome = (await getTransactionCount()).income

    return{
        highestExpenditure,
        highestIncome,
        noOfExpenses,
        noOfIncome
    }
};
