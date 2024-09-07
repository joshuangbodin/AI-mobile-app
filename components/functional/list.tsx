import { View, Image, FlatList } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh, vw } from '@/helpers/responsivesizes'
import { transactionList } from '@/types/app.t'
import ListItem from './listItem'
import { deleteFromList } from '@/appStorage/transactions/transactions'
import Empty from './Empty'


interface props {
  data?: transactionList;
  isOpen: number;
  setIsOpen: ()=> void;
  setIsSelected: (index:number)=>void;
  showEnd?:boolean;
}

const TransactionList = ({ data , isOpen ,showEnd=true, setIsOpen , setIsSelected}: props) => {
  if (!data) {
    return (
      <FlatList
        data={[]}

        renderItem={
          ({ item }) =>
            <CustomText isheader text={item}></CustomText>
        }

        ListEmptyComponent={
          <Empty/>}


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
        ({ item , index }) =>
          <ListItem
          key={index}
            name={item.name}
            index={index}
            description={item.description}
            dateCreated={item.dateCreated}
            type={item.type}
            amount={item.amount}
            category={item.category}
            onPress={()=>{setIsSelected(index)}}
            onLongPress={()=>{
              setIsOpen()
              deleteFromList(item)
              setIsOpen()
            }}
            
          />
      }
      ListFooterComponent={showEnd?data.list.length == 0 ?<></>:<CustomText size={vh(1.1)} isSupporting isCentered style={{paddingVertical:30}}>End Of List</CustomText>:<></>}
      ListEmptyComponent={
        <Empty/>
        }

        contentContainerStyle={{
         
        }}

      style={{
        margin: 0,

      }}

      
    />
  )
}

export default TransactionList