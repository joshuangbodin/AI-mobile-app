import { View,  StyleSheet } from 'react-native'
import React from 'react'
import { vh, vw } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'
import CustomText from '../typography/text'
import { formatCurrency } from '@/helpers/pricecustomization'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeIn } from 'react-native-reanimated'

interface props {
    savings?: number;
    income?: number;
    expenditure?: number;
}

const ExpenseBoard = ({ savings = 0, income = 0, expenditure = 0 }: props) => {



    return (
        <LinearGradient
            colors={[theme.primary.deepblue, theme.primary.purple, theme.primary.dark,]}
            style={style.container}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: -2 }}
        >
            <Animated.View entering={FadeIn.duration(500)} style={style.infobox}>

                {/* Savings */}
                <View>
                    <CustomText
                        size={vh(1.6)}
                        style={{ fontWeight: '500' }}
                        isSupporting
                    >Savings
                    </CustomText>

                    <CustomText
                        isheader size={vh(3)}
                        autosize
                        style={[
                            
                        ]}>{formatCurrency(savings)}</CustomText>
                </View>

                {/* false code */}
                <CustomText size={vh(1.7)} isSupporting>XXXX    XXXX   XXXX    XXXX</CustomText>

                {/* other Expenditure info */}
                <View style={style.flexed}>
                    <View style={style.valuecont}>
                        <CustomText
                            size={vh(1.4)}
                            style={{ fontWeight: '500' }}
                            isSupporting
                            
                        >Income</CustomText>
                        <CustomText
                            autosize
                            isheader size={vh(2.3)}
                            text={formatCurrency(income,true)}
                            >
                        </CustomText>
                    </View>


                    <View style={style.valuecont}>
                        <CustomText
                            size={vh(1.4)}
                            style={{ fontWeight: '500' }}
                            isSupporting
                        >Expense</CustomText>
                        <CustomText isheader size={vh(2.3)}  >{formatCurrency(expenditure, true)}</CustomText>
                    </View>
                </View>

            </Animated.View>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'relative',
        width: vw(91),
        height: vh(23),
        backgroundColor: theme.primary.deep,
        borderRadius: theme.curves.xxl,
        overflow: 'hidden',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'deepblue'
    },
    design: {
        position: 'absolute',
        width: vw(60),
        height: vw(60),
        backgroundColor: theme.primary.normal,
        shadowColor: theme.primary.normal,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
        borderRadius: theme.curves.xxl,
        right: vw(-45),
        transform: 'rotate(15deg)',
        zIndex: -12,
    },

    infobox: {
        padding: 15,
        width: '100%',
        height: '100%',
        gap: 10,
        justifyContent: 'space-around',
        paddingRight: 50,
    },

    //flexed

    flexed: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    moreinfo: {
        flexDirection: 'row',
        gap: 5,
    },
    valuecont:{
        width:vw(30)
    }
})

export default ExpenseBoard