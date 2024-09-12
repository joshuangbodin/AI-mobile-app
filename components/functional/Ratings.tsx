import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
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
    arr = [...arr, <AntDesign key={i} name='star' color={theme.primary.purple} size={vh(1.8)}  />]
  }
  for(var j = 0 ; j< (5-num) ; j++){
    arr = [...arr, <AntDesign key={j+5} name='star' color={theme.gray.gray2} size={vh(1.8)}  />]
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