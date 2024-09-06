import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { financialArticles } from '@/constants/articles'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'
import Ratings from './Ratings'
import { router } from 'expo-router'

const ArticleList = () => {
  return (
    <FlatList
    data={financialArticles}
    renderItem={({item , index}) =>(
        <ArticleItem onPress={()=> router.push({pathname:'/reading' , params:item})} brief={item.article} name={item.name}/>
    )}
    contentContainerStyle={{
        gap:10,
        marginTop:30
    }}
    />
  )
}

export default ArticleList




interface articleProps{
    name: string;
    brief: string;
    rating? : number;
    onPress: ()=> void
}

const ArticleItem = ({name ,rating ,onPress, brief}:articleProps) =>{
    return(
        <View style={styles.itemcont}>
            <TouchableOpacity onPress={onPress} style={styles.itempress}>
                <CustomText isheader size={vh(2.3)}>{name}</CustomText>
                <CustomText isSupporting style={{fontWeight:400}} size={vh(1.8)}>{brief.slice(0,70)+'...'}</CustomText>
                <View style={styles.rating}>
                    <Ratings/>
                </View>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    //item
    itemcont:{
        height:vh(12),
        justifyContent:'center',

    }
    ,
    itempress:{
        flex:1,
        justifyContent:'space-around',
    },
    rating:{

    }
})