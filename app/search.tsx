import { Pressable, StyleSheet, Image, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CustomText from "@/components/typography/text";
import { Feather, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { vh, vw } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import {
  deleteFromList,
  filterListByCategory,
  filterListByName,
  getListFromStorage,
} from "@/appStorage/transactions/transactions";
import { transaction, transactionList, user } from "@/types/app.t";
import TransactionList from "@/components/functional/list";
import CustomModal from "@/components/modal/CustomModal";
import { formatCurrency } from "@/helpers/pricecustomization";
import { randomCategoryColorGenerator } from "@/helpers/RandomGenerator";
import CategoryList from "@/components/functional/categoryList";

const search = () => {
 
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [transactionList, setTransationList] = useState<transactionList>();
  const [track, setTrack] = useState<number>(0);
  const [selectedTransaction, setSelectedTransaction] = useState<transaction>();
  const [searchPrompt , setSearchPrompt] = useState<string>('')
  const [active , setActive] = useState<string>('All')

 

  //initial render
  useEffect(() => {
    initializeBySearchPrompt();
    initializeListByCategory();
  }, [searchPrompt, track, active,isVisible]);

  const initializeList = async () => {
    const data = await getListFromStorage();

    if (data.success) {
      setTransationList(data.data);
    }
  };

  const setActiveCategory = (cate:string)=>{
    setActive(cate)
  }

 
  const initializeBySearchPrompt = async() =>{
    const {success , data} = await filterListByName(searchPrompt)
    if(success){
        setTransationList(data)
    }
  }

  const initializeListByCategory = async()=>{
    if(searchPrompt){
        return
    }
    const {success , data} = await filterListByCategory(active)
    if(success){
        setTransationList(data)
    }
  }

  const increment = () => {
    setTrack(track + 1);
  };

  const deleteHandler = async () => {
    if (!selectedTransaction) {
      return;
    }
    await deleteFromList(selectedTransaction);
    setSelectedTransaction(undefined);
    setIsVisible(false);

    return;
  };

  const isSelected = (index: number) => {
    setIsVisible(true);
    if (transactionList) {
      setSelectedTransaction(transactionList.list[index]);
    }
  };
  return (
    <ScreenWrapper SafeArea Style={styles.container}>
      <View style={styles.top}>
        <GoBackBtn />
        {/* search Bar */}
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={vh(2.4)} color={theme.gray.gray3} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Transactions"
            placeholderTextColor={theme.gray.gray3}
            value={searchPrompt}
            onChangeText={setSearchPrompt}
          />
          {searchPrompt&&<Pressable style={{width:vw(10)}} onPress={()=> setSearchPrompt('')}>
            <Ionicons name="close" size={vh(2.4)} color={theme.gray.gray3} />
          </Pressable>}
        </View>
      </View>

      {/* Category List */}
      <CategoryList active={active} setActive={setActiveCategory}/>

      {/* List */}
      {/* list area */}

      <View style={styles.listarea}>
        <TransactionList
          isOpen={track}
          setIsSelected={isSelected}
          setIsOpen={increment}
          data={transactionList}
          showEnd={false}
        />
      </View>

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
            <View style={styles.modalTopView}>
              <View style={styles.modalName}>
                <CustomText size={vh(3)} isheader>{selectedTransaction.name}</CustomText>
                <CustomText size={vh(1.4)} isSupporting>
                  {String(selectedTransaction.dateCreated).slice(0,10)+"  "+String(selectedTransaction.dateCreated).slice(11,16)}
                </CustomText>
              </View>
              <CustomText isheader size={vh(2.7)}>{formatCurrency(Number(selectedTransaction.amount) , true)}</CustomText>
            </View>

            {/* category and type */}
            <View style={styles.cateCont}>
              <View style={[styles.cateBtn , {backgroundColor: randomCategoryColorGenerator(selectedTransaction.category)}]}>
                <CustomText size={vh(1.7)}>{selectedTransaction.category}</CustomText>
              </View>
              <View style={styles.cateBtn}>
                <CustomText  size={vh(1.7)}>{selectedTransaction.type}</CustomText>
              </View>
            </View>

            {/* description */}
            <CustomText size={vh(1.6)} isSupporting>description:</CustomText>
            <View style={styles.desc}>
              <CustomText  >{selectedTransaction.description}</CustomText>
            </View>

            {/* buttons */}
            <View style={styles.btnContainer}>
              
              <TouchableOpacity onPress={deleteHandler} style={styles.btn}>
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

export default search;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems:'center'
  },
  searchBar: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.primary.dark,
    padding: 10,
    borderRadius: theme.curves.full,
  },
  searchInput: {
    color: theme.gray.white,
    fontSize: vh(1.9),
    flex: 1,
    height: "100%",
  },
  listarea: {
    width: vw(95),
    paddingHorizontal: 10,
    marginTop: 10,
    flex: 1,
    minHeight: vh(58),
    alignSelf: "center",
  },
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
