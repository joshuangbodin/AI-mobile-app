import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'

const TransactionList = () => {
  return (
   <FlatList
    data={[]}
    renderItem={({item}) => <CustomText isheader text={item}></CustomText>}
    ListEmptyComponent={<CustomText isCentered isSupporting style={{paddingTop: vh(15)}} text='No Transaction yet'/>}
    ListHeaderComponent={<CustomText  isSupporting style={{paddingTop:50}} text='All Transactions'/>}
   />
  )
}

export default TransactionList