import { View, Text , StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { vh, vw } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'
import CustomText from '../typography/text'
import { formatCurrency } from '@/helpers/pricecustomization'


interface props {
    savings?:number;
    income?:number;
    expenditure?:number;
}

const ExpenseBoard = ({savings=0,income=0,expenditure=0}:props) => {



  return (
    <View style={style.container}>
        <View style={style.design}></View>
        <View style={[style.design]}></View>


        <View style={style.infobox}>
            {/* header */}
            <CustomText isheader style={{paddingBottom:5}} size={vh(2.4)} text='Expense Summary'/>
            
            <CustomText isSupporting size={vh(2.2)}>
               Income: <CustomText style={income>0?{color:'lightgreen'}:income!=0?{color:'red'}:{}}>{formatCurrency(income)}</CustomText>
            </CustomText>
            <CustomText isSupporting size={vh(2.2)}>
               Total Expenses: <CustomText style={expenditure>0?{color:'lightgreen'}:expenditure!=0?{color:'red'}:{}}>{formatCurrency(expenditure)}</CustomText>
            </CustomText>
            <CustomText isSupporting size={vh(2.2)}>
               Savings: <CustomText style={savings>0?{color:'lightgreen'}:income!=0?{color:'red'}:{}}>{formatCurrency(savings)}</CustomText>
            </CustomText>

        </View>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        position:'relative',
        width:vw(95),
        height:vh(20),
        backgroundColor: theme.primary.deep,
        borderRadius:theme.curves.xl,
        overflow:'hidden',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderWidth:1,
        borderColor:'deepblue'
    },
    design:{
        position:'absolute',
        width: vw(60),
        height: vw(60),
        backgroundColor: theme.primary.normal,
        shadowColor: theme.primary.normal,
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        shadowRadius:20,
        elevation: 10,
        borderRadius:theme.curves.xxl,
        right:vw(-45),
        transform:'rotate(15deg)',
        zIndex:-12,
    },

    infobox:{
        padding:15,
        width:'100%',
        height:'100%',
        gap:10,
    },

    //flexed

    flexed:{
        
        justifyContent:'space-around',
       
    },
    moreinfo:{
        flexDirection:'row',
        gap:5,
    }
})

export default ExpenseBoard