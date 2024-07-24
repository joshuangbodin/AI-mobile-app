import { View, Text , StyleSheet ,Image , ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '@/constants/theme'

import { vh, vw } from '@/helpers/responsivesizes'
import { router } from 'expo-router'




const index = () => {
  return (
    <ScreenWrapper SafeArea={false} Style={style.wrapper}>
      
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
     
    </ScreenWrapper>
  )
}

const style = StyleSheet.create({
  wrapper:{
   backgroundColor: theme.primary.black,
    position:'relative'
  },
  page:{
    width: vw(100),
    height:vh(100),
    justifyContent:'space-around',
    alignItems:'center'
  },

  //bot image
  image:{
    width: vw(80),
    height:vw(80),
    //backgroundColor:theme.primary.darker,
    //shadowColor:theme.primary.darker,
    borderRadius: theme.curves.full,
    justifyContent:'center',
    alignItems:'center',
    //shadowOffset:{width:2 , height:2},
    //shadowOpacity:1,
    //shadowRadius:10,
  },
  botimage:{
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