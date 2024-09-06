import { View, Text } from 'react-native'
import React from 'react'
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { vh } from '@/helpers/responsivesizes';

interface props{
 rating: number;
}

const returnStar = (num:number)=>{
  if (num > 5){
    return
  }
  var arr:any[] = []
  for(var i=0;i<num ; i++){
    arr = [...arr, <MaterialIcons name='star' color={'yellow'} size={vh(1.8)}  />]
  }
  for(var j = 0 ; j< (5-num) ; j++){
    arr = [...arr, <MaterialIcons name='star' color={theme.gray.gray2} size={vh(1.8)}  />]
  }
  return arr
}

const Ratings = ({rating}:props) => {
  
  return (
    <View style={{flexDirection:'row'}}>
     {returnStar(rating)}
    </View>
  )
}

export default Ratings