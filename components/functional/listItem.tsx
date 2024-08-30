import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import CustomText from '../typography/text'
import { formatCurrency } from '@/helpers/pricecustomization';
import { vh, vw } from '@/helpers/responsivesizes';
import { Feather } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

interface listprops {
    name: string;
    description: string;
    amount: string;
    type: string;
    category: string;
    dateCreated: string;
    onPress?: () => void;
    onLongPress?: () => void;
}


const ListItem = ({ name, description, amount, type, category, dateCreated, onLongPress, onPress }: listprops) => {
    return (
        <TouchableOpacity style={style.container} onLongPress={onLongPress}>
            {/* price and category */}
            <View style={{width:'50%', justifyContent:'space-around' , gap:7}}>
                <View style={[style.amount]}>
                    <View style={[style.sign, type !== 'expenditure' && { backgroundColor: 'green' }]}>
                    </View>
                    <CustomText isheader size={vh(2.7)}>

                        {formatCurrency(Number(amount) , true)}
                    </CustomText>

                </View>
                <View  style={style.cate}>
                    <CustomText size={vh(1.7)} text={category} />
                </View>
            </View>

            {/* other info */}
            <View style={{width:'50%' , justifyContent:'space-around'}}>
                <CustomText style={{fontWeight:'700'}} text={name} />
                <CustomText size={vh(1.8)} text={description} />
                <CustomText isSupporting text={dateCreated.slice(0, 15) + "..."} />
            </View>
        </TouchableOpacity>
    )
}


const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: theme.primary.dark,
        borderRadius:theme.curves.lg,
        height: vh(11),
        gap:5,
    },

    amount: {
        justifyContent: "flex-start",
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    sign: {
        width: vh(2),
        height: vh(2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: theme.curves.full
    },
    cate:{
        backgroundColor:theme.primary.darker,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: theme.curves.full,
        width:'50%',
        padding:1.5,
    }
})

export default ListItem