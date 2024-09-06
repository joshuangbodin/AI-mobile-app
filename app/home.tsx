import { View, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomText from "@/components/typography/text";
import { transaction, transactionList, user } from "@/types/app.t";
import { retrieveUserData } from "@/appStorage/user/user";
import { vh, vw } from "@/helpers/responsivesizes";
import { Feather, FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import ExpenseBoard from "@/components/functional/expenseBoard";
import TransactionList from "@/components/functional/list";
import NewEntryBtn from "@/components/functional/newEntryBtn";
import { deleteFromList, getListFromStorage } from "@/appStorage/transactions/transactions";
import { getExpenseSummary } from "@/appStorage/transactions/Calculations";
import CustomModal from "@/components/modal/CustomModal";
import { formatCurrency } from "@/helpers/pricecustomization";
import { randomCategoryColorGenerator } from "@/helpers/RandomGenerator";
import { router } from "expo-router";
import Animated, { FadeInRight } from "react-native-reanimated";


const home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<user>();
  const [transactionList, setTransationList] = useState<transactionList>();
  const [track, setTrack] = useState<number>(0);
  const [selectedTransaction, setSelectedTransaction] = useState<transaction>();
  


  // expenseSummary
  const [expenseSummary, setExpenseSummary] = useState({
    income: 0,
    expenditure: 0,
    savings: 0,
  });

  //initial render
  useEffect(() => {
    initializeUserInfo();
    initializeList();
    initializeExpenseSummary();
  }, [isOpen, track , isVisible]);

  const initializeUserInfo = async () => {
    const data = await retrieveUserData();

    if (data.success) {
      setUserInfo(data.data);
    }
  };

  const initializeExpenseSummary = async () => {
    const data = await getExpenseSummary();

    if (data) {
      const { income, expenditure, savings } = data;
      setExpenseSummary({ income, expenditure, savings });
    }
  };

  const initializeList = async () => {
    const data = await getListFromStorage();

    if (data.success) {
      setTransationList(data.data);
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    initializeList();
  };

  const increment = () => {
    setTrack(track + 1);
  };

  const deleteHandler = async() => {
    if(!selectedTransaction){
      return
    }
    await deleteFromList(selectedTransaction);
    setSelectedTransaction(undefined);
    setIsVisible(false);

    return
  }

  const isSelected = (index: number) => {
    setIsVisible(true);
    if (transactionList) {
      setSelectedTransaction(transactionList.list[index]);
    }
  };

  const Action = [
    {
    route: '/analytics',
    name: 'Analytics',
    icon: ()=>  <FontAwesome6
        color={theme.gray.gray2}
        size={vh(1.8)}
        name="money-bill-trend-up"
      />
    },
     {
    route: '/search',
    name: 'Search',
    icon: ()=>  <FontAwesome5
        color={theme.gray.gray2}
        size={vh(1.8)}
        name="search"
      />
    }
      ]

  return (
    <ScreenWrapper SafeArea={true} Style={style.container}>
      
      {/* top */}
      <View style={style.top}>
        <View>
          <CustomText size={vh(1.6)} isSupporting>Hello!</CustomText>
          {userInfo ? (
            <CustomText isheader style={style.name}>{userInfo.name}</CustomText>
          ) : (
            <CustomText isheader style={style.name} text={"user"} />
          )}
        </View>

        {/* setting */}

        <TouchableOpacity onPress={()=>router.push('/settings')}>
          <FontAwesome6
            name="bars-staggered"
            size={vh(3.4)}
            color={theme.gray.gray2}
          />
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

          

     
      <View style={{justifyContent:'center' , height:vh(10)}}>
        <FlatList
        data={Action}
        horizontal
        
        contentContainerStyle={{ justifyContent:'center' , alignItems:'center' , gap:10,
          paddingLeft:10
        }}
        renderItem={({item , index})=>(
          <Animated.View entering={FadeInRight.duration(200 * (index+1))}>
              <TouchableOpacity onPress={()=>router.push(item.route)} style={style.actionbtn}>
            {item.icon()}
            <CustomText>{item.name} </CustomText>
            <Feather
              color={theme.gray.white}
              size={vh(1.8)}
              name="chevron-right"
            />
          </TouchableOpacity>
          </Animated.View>
        )}
        />
      </View>

      <View style={style.listarea}>
        <CustomText
          isSupporting
          size={vh(1.7)}
          style={{ paddingTop: 5, paddingBottom: 10 }}

        >All Transactions</CustomText>
        <TransactionList
          isOpen={track}
          setIsSelected={isSelected}
          setIsOpen={increment}
          data={transactionList}
        />
      </View>

      {/* add button */}
      <View>
        <NewEntryBtn isOpen={isOpen} setIsOpen={toggle} />
      </View>

      {/* modal */}
      <CustomModal
        setVisible={() => {
          setIsVisible(!isVisible);
        }}
        visible={isVisible}
        background={theme.primary.deep}
      >
        {/* view transaction */}
        {selectedTransaction ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 15 }}
          >
            {/* name , amount , date */}
            <View style={style.modalTopView}>
              <View style={style.modalName}>
                <CustomText size={vh(3)} isheader>{selectedTransaction.name}</CustomText>
                <CustomText size={vh(1.4)} isSupporting>
                  {String(selectedTransaction.dateCreated).slice(0,10)+"  "+String(selectedTransaction.dateCreated).slice(11,16)}
                </CustomText>
              </View>
              <CustomText isheader size={vh(2.7)}>{formatCurrency(Number(selectedTransaction.amount) , true)}</CustomText>
            </View>

            {/* category and type */}
            <View style={style.cateCont}>
              <View style={[style.cateBtn , {backgroundColor: randomCategoryColorGenerator(selectedTransaction.category)}]}>
                <CustomText size={vh(1.7)}>{selectedTransaction.category}</CustomText>
              </View>
              <View style={style.cateBtn}>
                <CustomText  size={vh(1.7)}>{selectedTransaction.type}</CustomText>
              </View>
            </View>

            {/* description */}
            <CustomText size={vh(1.6)} isSupporting>description:</CustomText>
            <View style={style.desc}>
              <CustomText  >{selectedTransaction.description}</CustomText>
            </View>

            {/* buttons */}
            <View style={style.btnContainer}>
              
              <TouchableOpacity onPress={deleteHandler} style={style.btn}>
                <FontAwesome6 name='trash-alt' color={'red'} size={vh(2.4)}/>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
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
            source={require('../assets/images/empty.png')}/>
            <CustomText isSupporting>No Transaction Selected</CustomText>
          </View>
        )}
      </CustomModal>
    </ScreenWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 8,
    flex: 1,
  },

  //top
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  name: {
    fontSize: vh(2.3),
    textTransform: "capitalize",
  },

  //expense board
  expenseboard: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  //call to action

  action: {
    marginTop: 20,
    paddingLeft: 10,

    gap: 15,
    height: vh(6),

    marginBottom: 0,
  },

  actionbtn: {
    minWidth: vw(40),
    maxWidth: 250,
    height:vh(6),
    justifyContent: "space-around",
    backgroundColor: theme.primary.dark,
    borderRadius: theme.curves.lg,
    alignItems: "center",
    borderCurve: "continuous",
    flexDirection: "row",
  },

  listarea: {
    width: vw(95),
    paddingHorizontal: 10,
    flex: 1,
    minHeight: vh(58),
    alignSelf: "center",
  },

  // modal

  modalTopView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  modalName:{
    width:'50%',
    gap:5
  },

  cateCont:{
    flexDirection:'row',
    gap:5,
    marginBottom:30,
  },

  cateBtn:{
    backgroundColor: theme.primary.dark,
    padding:3,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    borderRadius: theme.curves.sm
  },

  desc:{
    backgroundColor:theme.primary.dark,
    padding:10,
    height:vh(20),
    borderRadius: theme.curves.lg
  },

  btnContainer:{
    flexDirection:'row',
    gap:5,
    justifyContent:'flex-end',
    alignItems:'center'
  },

  btn:{
    width: vw(20),
    height:vh(5),
    backgroundColor: theme.primary.dark,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: theme.curves.md
  }
});

export default home;
