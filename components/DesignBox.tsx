import { View, StyleSheet} from 'react-native'
import React from 'react'
import { vw } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'

interface props{
    styles : any;
}

const DesignBox = ({styles}:props) => {
  return (
    <View style={[style.design , styles]}>
      
    </View>
  )
}

const style = StyleSheet.create({
    design:{
        width: vw(20),
        height: vw(20),
        borderRadius: theme.curves.full,
        backgroundColor:theme.primary.light,
        position:'absolute',
    }
})

export default DesignBox