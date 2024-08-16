import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'

const TransactionList = () => {
  return (
   <FlatList
    data={[]}
    renderItem={({item}) => <CustomText isheader text={item}></CustomText>}
    ListEmptyComponent={<CustomText isCentered isSupporting style={{paddingTop: vh(20)}} text='No Transaction yet'/>}
    ListHeaderComponent={<CustomText isSupporting style={{paddingTop:20}} text='All Transactions'/>}
    style={{
      margin:0,
      
    }}
   />
  )
}

export default TransactionList