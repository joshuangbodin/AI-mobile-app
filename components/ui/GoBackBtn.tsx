import {  TouchableOpacity } from 'react-native'
import React from 'react'
import {Feather} from '@expo/vector-icons'
import { vh } from '@/helpers/responsivesizes'
import { theme } from '@/constants/theme'

const GoBackBtn = () => {
  return (
   <TouchableOpacity>
    <Feather name='chevron-left' size={vh(4)} color={theme.gray.white}/>
   </TouchableOpacity>
  )
}

export default GoBackBtn