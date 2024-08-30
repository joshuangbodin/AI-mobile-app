import { View, Text , Image , StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'
import { vh, vw } from '@/helpers/responsivesizes'
import CustomText from '@/components/typography/text'
import CustomButton from '@/components/ui/button'
import { router } from 'expo-router'

const index = () => {
  return (
    <ScreenWrapper SafeArea={false} Style={Style.container}>
      {/* splash image */}
      <Image style={Style.image} source={require('../assets/images/splashimg.png')}/>


      {/* logo & motto */}
      <View>
        <CustomText isCentered isheader text='Budget Boy.'/>
        <CustomText isCentered isSupporting text='track your expenses seamlessly.'/>
        <CustomText isCentered isSupporting text='take notes of income vs expenditure.'/>
      </View>



      {/* call to action button */}
      <CustomButton title = {'Get Started' } onPress={()=>{router.push('/register')}}/>

     
     

    </ScreenWrapper>
  )
}

const Style = StyleSheet.create({
  container:{
    justifyContent:'space-around',
    alignItems:'center',
  },
  image:{
    width:vw(60),
    height:vw(60),
    alignSelf:'center',
  },

  //text info
  textarea:{
    justifyContent:'center',
    alignItems:'center'
  },
  textHead:{
    color: theme.gray.white,
    fontSize: vh(4),
    textAlign:'center',
    fontWeight: '600',
    textTransform:'capitalize'

  },
  textbottom:{
    color:theme.gray.gray2,
    textAlign:'center',
    padding:20,
    paddingHorizontal: 40,
    fontSize:vh(1.8),
  },

  //button
  btn:{
    width:vw(95),
    height: vh(8),
    backgroundColor:'rgba(225,225,225,.4)',
    borderRadius:theme.curves.xl,
    borderCurve:'continuous',
    justifyContent:'center',
    alignItems:'center'
  },

  btntext:{
    color: theme.gray.white,
    fontSize:vh(2.7),
    fontWeight:'500'

  }
})

export default index