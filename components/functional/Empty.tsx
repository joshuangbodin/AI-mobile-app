import { View, Image } from 'react-native'
import React from 'react'
import { vh, vw } from '@/helpers/responsivesizes'
import CustomText from '../typography/text'

const Empty = () => {
  return (
    <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        minHeight: 300,
        gap:15,
      }}>
        <Image 
        
        style={{
          width: vw(20),
          height: vw(20)
        }} 
        source={require('../../assets/images/empty.png')}/>
         <CustomText size={vh(1.3)} isSupporting>it's so empty here</CustomText>
      </View>
  )
}

export default Empty