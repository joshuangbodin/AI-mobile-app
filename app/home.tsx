import { View, Text  , StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import CustomText from '@/components/typography/text'
import { transactionList, user } from '@/types/app.t'
import { retrieveUserData } from '@/appStorage/user/user'
import { vh, vw } from '@/helpers/responsivesizes'
import { Feather, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { theme } from '@/constants/theme'
import ExpenseBoard from '@/components/functional/expenseBoard'
import TransactionList from '@/components/functional/list'
import NewEntryBtn from '@/components/functional/newEntryBtn'
import { clearList, getListFromStorage } from '@/appStorage/transactions/transactions'
import { getExpenseSummary } from '@/appStorage/transactions/Calculations'


const home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userInfo , setUserInfo] =  useState<user>()
  const [transactionList , setTransationList] = useState<transactionList>()
  const [track , setTrack] = useState(0)

  // expenseSummary
  const [ expenseSummary , setExpenseSummary] = useState({income:0 , expenditure:0, savings:0})

  //initial render
  useEffect(()=>{
    
    initializeUserInfo()
    initializeList()
    initializeExpenseSummary()
  }, [isOpen , track])


  const initializeUserInfo  = async ()=>{
    const data = await retrieveUserData()

    if(data.success){
      setUserInfo(data.data)
    }
  }

  const initializeExpenseSummary = async()=>{

    const data = await getExpenseSummary()

    if(data)
    {
      const {income ,expenditure , savings}=data
      setExpenseSummary({income,expenditure,savings})
    }

  }

  const initializeList = async ()=>{
    const data = await getListFromStorage()

    if(data.success){
      setTransationList(data.data)
    }
    
  }

 const toggle = ()=>{
  setIsOpen(!isOpen)
 }

 const increment =()=>{
  setTrack(track+1)
 }


  return (
    <ScreenWrapper SafeArea={true} Style={style.container}>
       
       {/* top */}
       <View style={style.top}>
            <View>
              <CustomText isSupporting text='Hello!'/>
              {userInfo?<CustomText isheader style={style.name} text={userInfo.name}/>:<CustomText isheader style={style.name} text={'user'}/>}
            </View>

            {/* delete user button */}

            <TouchableOpacity>
              <FontAwesome6 name="bars-staggered" size={vh(4)} color={theme.gray.gray2}/>
            </TouchableOpacity>
       </View>

       {/* expense board */}

      <View style={style.expenseboard}>
            <ExpenseBoard 
            income={expenseSummary.income}
            expenditure={expenseSummary.expenditure}
            savings={expenseSummary.savings}
            />
      </View>

      {/* call to actions */}
      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={style.action}>


        {/* button 1 */}
        <TouchableOpacity style={style.actionbtn}>

          <FontAwesome6 color={theme.gray.gray2} size={vh(1.8)} name='money-bill-trend-up'/>

          <CustomText text='Set a Goal'/>

          <Feather color={theme.gray.white} size={vh(1.8)} name='chevron-right'/>

        </TouchableOpacity>

        {/* button 2 */}
        <TouchableOpacity style={style.actionbtn}>
        <FontAwesome6 color={theme.gray.gray2} size={vh(1.8)} name='piggy-bank'/>

          <CustomText text='Start Budget'/>

          <Feather color={theme.gray.white} size={vh(1.8)} name='chevron-right'/>
        </TouchableOpacity>

        {/* button 3 */}
        <TouchableOpacity style={style.actionbtn}>
        <MaterialIcons color={theme.gray.gray2} size={vh(1.8)} name='celebration'/>

          <CustomText text='Plan Event'/>

          <Feather color={theme.gray.white} size={vh(1.8)} name='chevron-right'/>
        </TouchableOpacity>

      </ScrollView>


      {/* list area */}

        <View style={style.listarea}>
        <CustomText 
      isSupporting 
      style={{ paddingTop: 20 , paddingBottom:10}} 
      text='All Transactions' />
          <TransactionList isOpen={track} setIsOpen={increment} data={transactionList}/>
        </View>



    {/* add button */}
    <View><NewEntryBtn isOpen={isOpen} setIsOpen={toggle}/></View>
  </ScreenWrapper>

  )
}

const style = StyleSheet.create({
  container:{
    position:'relative',
    paddingHorizontal:8,
    flex:1,
  },

  //top
  top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:5,
  }
  ,
  name:{
    fontSize:vh(2.3) , textTransform:'capitalize'
  },

  //expense board
  expenseboard:{
    marginTop:20,
  }

  ,

  //call to action

  action:{
    marginTop:15,
    paddingLeft:10,
    
    gap:15,
    height: vh(6),

    marginBottom:0,
  },

  actionbtn:{
    minWidth: vw(40),
    justifyContent:'space-around',
    backgroundColor:theme.primary.dark,
    borderRadius:theme.curves.lg,
    alignItems:'center',
    borderCurve:'continuous',
    flexDirection:'row'

  },

  listarea:{
    width:vw(95),
    paddingHorizontal:5,
    flex:1,
   minHeight:vh(61),
   alignSelf:'center',
  }

})

export default home