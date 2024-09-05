import { View, TouchableOpacity, StyleSheet,  } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import CustomText from '../typography/text'
import { formatCurrency } from '@/helpers/pricecustomization';
import { vh } from '@/helpers/responsivesizes';
import { theme } from '@/constants/theme';
import { randomCategoryColorGenerator } from '@/helpers/RandomGenerator';

interface listprops {
    name: string;
    index:number;
    description: string;
    amount: string;
    type: string;
    category: string;
    dateCreated: Date;
    onPress?: () => void;
    onLongPress?: () => void;
}


const ListItem = ({ name, description, amount, type, category, dateCreated,index, onLongPress, onPress }: listprops) => {
    return (
        <Animated.View entering={FadeInDown.duration(200*(index+1))}>
            <TouchableOpacity style={style.container} onLongPress={onLongPress} onPress={onPress}>
                {/* price and category */}
                <View style={{width:'50%', justifyContent:'space-around' , height:'100%'}}>
                    <View style={[style.amount]}>
                        <View style={[style.sign, type !== 'expenditure' && { backgroundColor: 'green' }]}>
                        </View>
                        <CustomText isheader size={vh(2.7)}>
                            {formatCurrency(Number(amount) , true)}
                        </CustomText>
                    </View>
                    <View  style={[style.cate  , {backgroundColor:randomCategoryColorGenerator(category)}]}>
                        <CustomText isSupporting style={{color:theme.gray.white}} size={vh(1.2)} text={category} />
                    </View>
                </View>
                {/* other info */}
                <View style={{width:'50%' , justifyContent:'space-around',height:'100%'}}>
                    <CustomText style={{fontWeight:'700'}} text={name} />
                    <CustomText size={vh(1.7)} text={description.length>20? description.slice(0,20)+'...' : description} />
                    <CustomText isSupporting text={String(dateCreated).slice(0,10)} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}


const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        backgroundColor: theme.primary.dark,
        borderRadius:theme.curves.xl,
        height: vh(12),
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
        minWidth:'50%',
        padding:1.5,
        maxWidth:'70%'
    }
})

export default ListItem