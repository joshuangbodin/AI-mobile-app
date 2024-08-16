import { TouchableOpacity , Text , StyleSheet } from 'react-native'
import React from 'react'
import { vh, vw } from '@/helpers/responsivesizes';
import { theme } from '@/constants/theme';


interface props{
    title:string;
    onPress: ()=> void;
    isFullWidth?: boolean;
    style?:any;
    textstyle?:any;
}

const CustomButton = ({title,onPress , isFullWidth=true , style , textstyle}:props ) => {
  return (
    <TouchableOpacity style={[
       isFullWidth? styles.btnContainer:{...styles.btnContainer , width:'auto'},
       style

        ]} onPress={onPress}>
        <Text style = {[styles.btntext , textstyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContainer:{
        width : vw(95),
        height:vh(8),
        backgroundColor:theme.primary.normal,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:theme.curves.lg,
        borderCurve:'continuous',

    },

    btntext:{
        fontSize: vh(2.5),
        color:theme.gray.white,
        fontWeight:'700'
    }

})

export default CustomButton