import { View, Text } from 'react-native'
import React from 'react'
<<<<<<< HEAD

const home = () => {
  return (
    <View>
      <Text>home</Text>
    </View>
=======
import ScreenWrapper from '@/components/ScreenWrapper'

const home = () => {
  return (
    <ScreenWrapper SafeArea={true} Style={{}}>
        <Text style={{color:'white'}}>Hello world</Text>
    </ScreenWrapper>
>>>>>>> abca2d1 (change app)
  )
}

export default home