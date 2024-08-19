import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'
import { transactionList } from '@/types/app.t'
import ListItem from './listItem'
import { deleteFromList } from '@/appStorage/transactions/transactions'

interface props {
  data?: transactionList;
  isOpen: number;
  setIsOpen: ()=> void;
}

const TransactionList = ({ data , isOpen , setIsOpen }: props) => {
  if (!data) {
    return (
      <FlatList
        data={[]}

        renderItem={
          ({ item }) =>
            <CustomText isheader text={item}></CustomText>
        }

        ListEmptyComponent={
          <CustomText
            isCentered
            isSupporting
            style={{ paddingTop: vh(20) }}
            text='No Transaction yet'
          />}


        style={{
          margin: 0,

        }}
      />
    )
  }
  return (
    <FlatList
      data={data.list}

      renderItem={
        ({ item }) =>
          <ListItem
            name={item.name}
            description={item.description}
            dateCreated={item.dateCreated}
            type={item.type}
            amount={item.amount}
            category={item.category}
            onLongPress={()=>{
              setIsOpen()
              deleteFromList(item)
              setIsOpen()
            }}
          />
      }

      ListEmptyComponent={
        <CustomText
          isCentered
          isSupporting
          style={{ paddingTop: vh(20) }}
          text='No Transaction yet'
        />}

        contentContainerStyle={{
          gap:8
        }}

      style={{
        margin: 0,

      }}
    />
  )
}

export default TransactionList