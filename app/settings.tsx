import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import GoBackBtn from '@/components/ui/GoBackBtn'
import CustomText from '@/components/typography/text'
import { Feather } from '@expo/vector-icons'
import { vh } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'
import { deleteUserInfo } from '@/appStorage/user/user'
import { router } from 'expo-router'

const settings = () => {
  return (
   <ScreenWrapper SafeArea>
      {/* Top */}
      <GoBackBtn/>

      {/* List */}
      <ScrollView>
        <SettingItem name='Delete All Info' onPress={async ()=> {await deleteUserInfo()
          router.push('/')
          return
        } } icon={'trash'}/>
      </ScrollView>
   </ScreenWrapper>
  )
}

export default settings








interface SetProps{
  name:string;
  icon?:any;
  onPress?: ()=> void;
}




const SettingItem = ({name ,icon ,onPress}:SetProps) =>{
return(
  <TouchableOpacity onPress={onPress}>
    <CustomText isheader size={vh(2.3)}>
      {name}
    </CustomText>
    <Feather size={vh(2)} color={theme.gray.white} name={icon}/>
  </TouchableOpacity>
) 
}