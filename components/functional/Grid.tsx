import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatCard from './statcard'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'
import { getFullAnalytics } from '@/appStorage/transactions/Calculations'
import { formatCurrency } from '@/helpers/pricecustomization'

const Grid = () => {
  const[info, setInfo]= useState({
    highestExpenditure:{
      name: "",
      type: "income",
      dateCreated: new Date(),
      description: "",
      category: "",
      amount: "",
    },
    highestIncome:{
      name: "",
      type: "income",
      dateCreated: new Date(),
      description: "",
      category: "",
      amount: "",
    },
    noOfExpenses:0,
    noOfIncome:0
  })

  useEffect(()=>{
    initializeInfo()
  },[])


  const initializeInfo=async()=>{
    const data = await getFullAnalytics()

    if(data){
      setInfo(data)
    }
  }
  return (
    <View style={{gap:10 , justifyContent:'center' , alignItems:'center'}}>
      <CustomText isSupporting>Transaction Data</CustomText>
      <View style={styles.grid}>
        <View style={styles.columns}>
          <StatCard info='No of Income' data={info.noOfIncome} units='Transactions' height={vh(25)}/>
          <StatCard info='Highest Expense' textSize={vh(2.4)} data={info.highestExpenditure.name} units='Name' height={vh(25)}/>
          <StatCard info='Highest Income' textSize={vh(2.5)} data={formatCurrency(Number(info.highestIncome.amount),true)} units='Naira' height={vh(20)}/>
        </View>
        <View style={styles.columns}>
          <StatCard info='No of Expense' data={info.noOfExpenses} units='Transactions' height={vh(20)}/>
          <StatCard info='Highest Expense' textSize={vh(2.5)} data={formatCurrency(Number(info.highestExpenditure.amount),true)} units='Naira' height={vh(20)}/>
          <StatCard info='Highest Income' textSize={vh(2.4)} data={info.highestIncome.name} units='Name' height={vh(30)}/>
        </View>
      </View>
    </View>
  )
}

export default Grid

const styles = StyleSheet.create({
  grid:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-evenly'
  },
  columns:{
    width: '50%',
    paddingHorizontal:4,
    gap:8
  }
})