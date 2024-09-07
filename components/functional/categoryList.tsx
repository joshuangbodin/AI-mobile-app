import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh, vw } from '@/helpers/responsivesizes'
import { TouchableOpacity } from 'react-native'
import { theme } from '@/constants/theme'
import { categories } from '@/constants/functional'
import { randomCategoryColorGenerator } from '@/helpers/RandomGenerator'
import Animated, { FadeInRight } from 'react-native-reanimated'

interface props{
    active: string;
    setActive : (categoryname:string)=> void
}

const CategoryList = ({active , setActive}:props) => {
  return (
 <View style={{justifyContent:'center' , height:vh(10)}}>
    <FlatList
    contentContainerStyle={{justifyContent:'center',gap:5,alignItems:'center'}}
    data={['All',...categories.expense , ...categories.income]}
    horizontal
    renderItem={({item,index})=>(
        <CateGoryCard key={index} index={index+1} onPress={()=>setActive(item)} color={active == item ? randomCategoryColorGenerator(item): theme.primary.dark} name={String(item)}/>
    )}
    >

    </FlatList>
 </View>
  )
}

export default CategoryList


interface catProps{
    name:string;
    color?:string;
    onPress: ()=> void;
    index:number;
}

const CateGoryCard = ({name,color ,index, onPress}:catProps)=>{
    return(
        <Animated.View entering={FadeInRight.duration(index*200)}>
            <TouchableOpacity onPress={onPress} style={[styles.CateCard , {backgroundColor:color}]}>
                <CustomText>{name}</CustomText>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    CateCard:{
        minWidth:vw(30),
        maxWidth:200,
        justifyContent:'center',
        alignItems:'center',
        height: vh(5),
        backgroundColor:theme.primary.dark,
        borderRadius:theme.curves.lg,
        paddingHorizontal:10
    }
})