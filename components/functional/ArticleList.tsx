import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'
import Ratings from './Ratings'
import { router } from 'expo-router'
import { theme } from '@/constants/theme'
import Animated, { FadeInDown } from 'react-native-reanimated'

interface props{
    data: any[]
}

const ArticleList = ({data}:props) => {
  return (
    <FlatList
    data={data}
    renderItem={({item , index}) =>(
        <ArticleItem Key={index+1} key={index} rating={item.rating} onPress={()=> router.push({pathname:'/reading' , params:{name:item.name}})} brief={item.article} name={item.name}/>
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
    rating : number;
    onPress: ()=> void;
    Key:number;
}

const ArticleItem = ({name ,Key,rating ,onPress, brief}:articleProps) =>{
    return(
        <Animated.View key={Key} entering={FadeInDown.duration(200*Key)} style={styles.itemcont}>
            <TouchableOpacity onPress={onPress} style={styles.itempress}>
                <CustomText isheader size={vh(2.3)}>{name}</CustomText>
                <CustomText isSupporting style={{fontWeight:400}} size={vh(1.8)}>{brief.slice(0,70)+'...'}</CustomText>
                <View style={styles.rating}>
                    <Ratings rating={rating}/>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}



const styles = StyleSheet.create({
    //item
    itemcont:{
        height:vh(15),
        justifyContent:'center',
        // borderTopWidth:2,
        // borderTopColor:theme.primary.dark

    }
    ,
    itempress:{
        flex:1,
        padding:10,
        justifyContent:'space-around',
    },
    rating:{

    }
})