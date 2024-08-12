import { View, Text , Image , StyleSheet} from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
<<<<<<< HEAD
import { theme } from '@/constants/theme'

import { vh, vw } from '@/helpers/responsivesizes'
=======
import { vw } from '@/helpers/responsivesizes'
import CustomText from '@/components/typography/text'
import CustomButton from '@/components/ui/button'
>>>>>>> abca2d1 (change app)
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

      
<<<<<<< HEAD
      <ImageBackground source={require('../assets/images/backgroundImage.jpg')}>
        <View style={style.page}>
          {/*Bot Image*/ }
          <View style={style.image}>
            <Image resizeMode='contain' style={style.botimage}  source={require('../assets/images/bot.png')}></Image>
          </View>

          {/* Text info */}
          <View style={style.textarea}>
            <Text style={style.textHead}>Providing the </Text>
            <Text style={style.textHead}> best AI solutions</Text>
            <Text style={style.textbottom}>AI assistant can answer any of your questions. just ask here.</Text>
          </View>

          {/* button element */}
          <TouchableOpacity style={style.btn} onPress={()=>router.push('home')}>
            <Text style={style.btntext} >Get Started</Text>
          </TouchableOpacity>

        </View>
        </ImageBackground>
     
=======
>>>>>>> abca2d1 (change app)
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
<<<<<<< HEAD
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
=======
>>>>>>> abca2d1 (change app)
  }
})

export default index