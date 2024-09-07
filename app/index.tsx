import { View,  Image , StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
//import { theme } from '@/constants/theme'
import { vh } from '@/helpers/responsivesizes'
import { retrieveUserData } from '@/appStorage/user/user'
import { router } from 'expo-router'
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated'
import CustomText from '@/components/typography/text'
import { theme } from '@/constants/theme'


const index = () => {

  useEffect(()=>{
    setTimeout(checkIfUserExists , 5000)
  },[])


  const checkIfUserExists = async () => {
   

    const data = await retrieveUserData()

    if (data.success) {
        if (data.data.appLock) {
            
            router.push('/login')
            return;
        }

        
        router.push('/home')
        return;

    }
    else {
        router.push('/splash')
    }

}

  return (
    <ScreenWrapper SafeArea={false} Style={Style.container}>
     <View style={{gap:30}}><Animated.Image entering={BounceIn}  exiting={FadeOut} style={Style.image} source={require('../assets/images/logo.png')}/>
     
     </View>
    </ScreenWrapper>
  )
}

const Style = StyleSheet.create({
  container:{
    justifyContent:'space-around',
    alignItems:'center',
  },
  image:{
    width:vh(12),
    height:vh(15),
    alignSelf:'center',
  },

  
})

export default index