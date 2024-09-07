import { View,  Image , StyleSheet} from 'react-native'
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
      <View style={{gap:5 , justifyContent:'center',alignItems:'center'}}>
        <Image style={{width:vh(8) , height:vh(8),marginBottom:10}} source={require('../assets/images/logo.png')}/>
        <CustomText isCentered isheader size={vh(2.2)} text='FinTrack.'/>
        <CustomText isCentered size={vh(1.7)} isSupporting text='track your expenses seamlessly.'/>
        {/* <CustomText isCentered size={vh(1.4)} isSupporting text='take notes of income vs expenditure.'/> */}
      </View>



      {/* call to action button */}
      <CustomButton title = {'Continue' } onPress={()=>{router.push('/register')}}/>
    </ScreenWrapper>
  )
}

const Style = StyleSheet.create({
  container:{
    justifyContent:'space-around',
    alignItems:'center',
  },
  image:{
    width:vh(40),
    height:vh(40),
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