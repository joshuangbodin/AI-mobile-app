import {  TouchableOpacity } from 'react-native'
import React from 'react'
import {Feather} from '@expo/vector-icons'
import { vh } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'
import { router } from 'expo-router'

const GoBackBtn = () => {
  return (
   <TouchableOpacity onPress={()=> router.back()}>
    <Feather name='chevron-left' size={vh(4)} color={theme.gray.white}/>
   </TouchableOpacity>
  )
}

export default GoBackBtn