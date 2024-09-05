import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh, vw } from '@/helpers/responsivesizes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '@/constants/theme'
import { categories } from '@/constants/functional'
import { randomCategoryColorGenerator } from '@/helpers/RandomGenerator'

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
    renderItem={({item})=>(
        <CateGoryCard onPress={()=>setActive(item)} color={active == item ? randomCategoryColorGenerator(item): undefined} name={String(item)}/>
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
    onPress: ()=> void
}

const CateGoryCard = ({name,color , onPress}:catProps)=>{
    return(
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.CateCard , {backgroundColor:color}]}>
                <CustomText>{name}</CustomText>
            </TouchableOpacity>
        </View>
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