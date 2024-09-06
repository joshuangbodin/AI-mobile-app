import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh, vw } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface props{
    message: string,
    type: 'success' | 'error' | 'neutral'
    color?:string
}


const Toast = ({message, type,color}:props) => {
    const {top} = useSafeAreaInsets()

    const marginTop = top>0? top+5 : top+10
    
  return (
   <Animated.View entering={FadeInUp} exiting={FadeOutUp}  style={style.container}>
    <View style={[style.content ,{marginTop}, type=='success'?{}:type=='error'?{backgroundColor:'red'}:{backgroundColor:color}]}>
        <CustomText isheader size={vh(2)}>{message}</CustomText>
    </View>
   </Animated.View>
  )
}

const style = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        width:vw(100),
        minHeight: vh(8),
        left:0,
        top:0,
        zIndex:90
    },
    content:{
        width:vw(80),
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        height: vh(6),
        borderRadius: theme.curves.md
    }
})

export default Toast