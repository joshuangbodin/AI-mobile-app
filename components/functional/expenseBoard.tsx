import { View, Text , StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { vh, vw } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'
import CustomText from '../typography/text'
import { formatCurrency } from '@/helpers/pricecustomization'


interface props {
    total?:number;
    income?:number;
    expenditure?:number;
}

const ExpenseBoard = ({total=0,income=0,expenditure=0}:props) => {



  return (
    <View style={style.container}>
        <View style={style.design}></View>
        <View style={[style.design]}></View>


        <View style={style.infobox}>

            {/* total */}
            <View style={style.flexed}>
            <View style={{}}>
            <CustomText isSupporting text='Total:'/>
                <CustomText style={{fontSize:vh(4)}} isheader>
                    
                    {
                        total? 
                        total:
                        '₦ 0.00'
                        
                    }
                </CustomText>
            </View>
            <View>
                <Text></Text>
            </View>
            </View>

            {/* income & expenditure */}

            <View style={style.flexed}>
                <View style={style.moreinfo}>
                    <CustomText isSupporting text='Income:'/><CustomText text='# 0.00'/>
                </View>
                <View style={style.moreinfo}>
                    <CustomText
                    isSupporting
                    text='Expenditure:'/><CustomText text='# 0.00'/>
                </View>

            </View>


        </View>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        position:'relative',
        width:vw(95),
        height:vh(20),
        backgroundColor: theme.primary.normal,
        borderRadius:theme.curves.xl,
        overflow:'hidden',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    design:{
        position:'absolute',
        width: vw(60),
        height: vw(60),
        backgroundColor: theme.primary.deep,
        shadowColor: theme.primary.deep,
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
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'100%',
        height:'100%',
    },

    //flexed

    flexed:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:vw(90)
    },
    moreinfo:{
        flexDirection:'row',
        gap:5,
    }
})

export default ExpenseBoard