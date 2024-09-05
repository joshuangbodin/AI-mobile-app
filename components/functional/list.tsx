import { View, Image, FlatList } from 'react-native'
import React from 'react'
import CustomText from '../typography/text'
import { vh, vw } from '@/helpers/responsivesizes'
import { transactionList } from '@/types/app.t'
import ListItem from './listItem'
import { deleteFromList } from '@/appStorage/transactions/transactions'


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
          <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            minHeight: 300,
          }}>
            <Image 
            
            style={{
              width: vw(30),
              height: vw(30)
            }} 
            source={require('../../assets/images/empty.png')}/>
            <CustomText isSupporting>No Transaction Yet</CustomText>
          </View>}


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
            name={item.name}
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
      ListFooterComponent={showEnd?<CustomText size={vh(1.4)} isSupporting isCentered style={{paddingVertical:30}}>End Of List</CustomText>:<></>}
      ListEmptyComponent={
        <View style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          minHeight: 300,
        }}>
          <Image 
          
          style={{
            width: vw(30),
            height: vw(30)
          }} 
          source={require('../../assets/images/empty.png')}/>
          <CustomText isSupporting>No Transaction Yet</CustomText>
        </View>
        }

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