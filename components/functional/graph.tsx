import { View, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../typography/text'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/constants/theme'
import { vh, vw } from '@/helpers/responsivesizes'
import { getPercentageSummary } from '@/appStorage/transactions/Calculations'

interface BarProps{
    name:string;
    percentage: number;
}


const Graph = () => {
    const [percentageSummary,setPercentageSummary] = useState({
        incomePercentage:0,
        expensePercentage:0,
        savingsPercentage:0,
        lossPercentage:0
    })



    useEffect(()=>{
        retrieve()
    },[])

    const retrieve = async()=>{
        const data = await getPercentageSummary()

        if(data){
            setPercentageSummary(data)
        }
        
    }
  return (
    <View style={style.chartCont}>
        <Bar name='income' percentage={percentageSummary.incomePercentage}/>
        <Bar name='Savings' percentage={percentageSummary.savingsPercentage}/>
        <Bar name='Expense' percentage={percentageSummary.expensePercentage}/>
        <Bar name='Loss' percentage={percentageSummary.lossPercentage}/>
    </View>
  )
}

const Bar = ({name , percentage}:BarProps)=>{

    function getValueByPercentage(percentage:number){
        const total = vh(20)
        const ratio = percentage/100

        if (percentage<0){
            return 0
        }

        if(percentage>100){
            return total
        }
       

        return total * ratio
    }
    return (
        <View style={style.barCont}>
        <View>
            <CustomText size={vh(1.6)}>
                {percentage.toFixed(1)}%
            </CustomText>
        </View>
        <View>
            <LinearGradient
            colors={[theme.primary.normal , theme.primary.purple]}
            style={[style.bar ,{ height:getValueByPercentage(percentage)}]}
            start={{x:-1 , y:-1}}
            end={{x:1 , y:1}}
>
            </LinearGradient>
        </View>
        <CustomText isSupporting>{name}</CustomText>
      </View>
    )
}

const style = StyleSheet.create({
    chartCont:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width: vw(100),
        height: vh(30),
        alignItems:'flex-end',
        marginTop:50
    },
    barCont:{
        height:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
        gap:10,
    },
    bar:{
        width:vw(8),
        borderRadius: theme.curves.full,

    }
})

export default Graph