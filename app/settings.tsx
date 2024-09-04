import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import GoBackBtn from '@/components/ui/GoBackBtn'

const settings = () => {
  return (
   <ScreenWrapper SafeArea>
      {/* Top */}
      <GoBackBtn/>

      {/* List */}
      <ScrollView>
        
      </ScrollView>
   </ScreenWrapper>
  )
}

export default settings