import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { vh, vw } from "@/helpers/responsivesizes";
import CustomText from "../typography/text";
import CustomButton from "../ui/button";
import { categories } from "@/constants/functional";
import { transaction } from "@/types/app.t";
import { addToList } from "@/appStorage/transactions/transactions";
import { LinearGradient } from "expo-linear-gradient";
import CustomModal from "../modal/CustomModal";
import Toast from "../toast/toast";
import { showToast } from "../toast/createToast";

interface props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const NewEntryBtn = ({ isOpen, setIsOpen }: props) => {
  const [transaction, setTransaction] = useState<transaction>({
    name: "",
    description: "",
    amount: "",
    type: "income",
    category: "",
    dateCreated: new Date(),
  });

  const [show , setShow]= useState<string>('')

  const createEntry = async () => {
    const { name, description, amount, type, category } = transaction;

    if (!name || !description || !amount || !type || !category) {
      showToast("Please Provide all Information", setShow);
      return;
    }

    if (Number.isNaN(Number(amount))) {
      showToast("amount is not a number", setShow);
      return;
    }

    await addToList(transaction);
    setTransaction({
      name: "",
      description: "",
      amount: "",
      type: "income",
      category: "",
      dateCreated: new Date(),
    });
    setIsOpen();
  };

  return (
    <View>
     
      {/* pop up */}
      <CustomModal
        closeBtn={() => (
          <Feather
            style={{ marginTop: 10, marginLeft: 5 }}
            name="chevron-left"
            color={theme.gray.gray3}
            size={vh(3)}
          />
          
        )}
        background={theme.primary.dark}
        visible={isOpen}
        styles={{ left: 0, width: vw(100) }}
        height={vh(95)}
        setVisible={setIsOpen}
      >
        {show&&<Toast message={show} type="error"/> }
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.form}
        >
          {/* form head */}
          <CustomText isSupporting size={vh(2.5)} text="New Entry" />

          <View style={{ gap: 10 }}>
            {/* name */}
            <View style={styles.View} >
              <TextInput
                value={transaction.name}
                onChangeText={(value) =>
                  setTransaction({ ...transaction, name: value })
                }
                style={styles.formName}
                placeholder=" Name"
                placeholderTextColor={theme.gray.gray2}
              
              />
            </View>
            {/* Amount */}
            <View style={styles.View}>
              <TextInput
                value={transaction.amount}
                onChangeText={(value) =>
                  setTransaction({ ...transaction, amount: value })
                }
                keyboardType="numeric"
                style={styles.formName}
                placeholder="$Amount"
                placeholderTextColor={theme.gray.gray2}
              />
            </View>
            {/* description */}
            <View style={styles.View}>
              <TextInput
                value={transaction.description}
                onChangeText={(value) =>
                  setTransaction({ ...transaction, description: value })
                }
                style={styles.formDescription}
                multiline
                placeholder="Description ..."
                placeholderTextColor={theme.gray.gray2}
              />
            </View>
          </View>

          {/* type toggle */}
          <View style={styles.type}>
            <TouchableOpacity
              onPress={() => {
                setTransaction({ ...transaction, type: "income" });
              }}
              style={[
                styles.typeCategory,
                transaction.type == "income" && {
                  backgroundColor: theme.primary.darker,
                },
              ]}
            >
              <CustomText text="Income"></CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setTransaction({ ...transaction, type: "expenditure" });
              }}
              style={[
                styles.typeCategory,
                transaction.type == "expenditure" && {
                  backgroundColor: theme.primary.darker,
                },
              ]}
            >
              <CustomText text="expenditure"></CustomText>
            </TouchableOpacity>
          </View>

          {/* category */}
          <View>
            <FlatList
              data={
                transaction.type == "expenditure"
                  ? categories.expense
                  : categories.income
              }
              renderItem={({ item }) => (
                
                <TouchableOpacity
                  onPress={() => {
                    setTransaction({ ...transaction, category: item });
                  }}
                  style={[
                    styles.categotyCard,
                    transaction.category == item && {
                      backgroundColor: theme.primary.darker,
                    },
                  ]}
                >
                  <CustomText text={item} />
                </TouchableOpacity>
              )}
              style={{ marginTop: 5 }}
              contentContainerStyle={{
                gap: 5,
              }}
            />
          </View>

          {/* button */}
          <CustomButton
            textstyle={{ fontWeight: "500", fontSize: vh(2) }}
            isFullWidth={false}
            style={{ height: vh(6) }}
            onPress={createEntry}
            title="Create Entry"
          />
        </ScrollView>
      </CustomModal>

      <View style={styles.cont}>
        {/* button */}
        {!isOpen && (
          <TouchableOpacity onPress={setIsOpen}>
            <LinearGradient
              colors={[
                theme.primary.deep,
                theme.primary.purple,
                theme.primary.dark,
              ]}
              style={styles.btn}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: -2 }}
            >
              <Ionicons
                size={vh(4.5)}
                color={theme.gray.white}
                name={isOpen ? "close-outline" : "add"}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    position: "absolute",
    bottom: vh(3.5),
    right: 4,
    gap: 10,
  },
  btn: {
    width: vw(15),
    height: vw(15),
    borderRadius: theme.curves.full,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  //form
  form: {
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 20,
    height: "100%",
  },
  formName: {
    width: "100%",
    fontSize: vh(2.2),
    height: vh(4.5),
   
    
    color: theme.gray.gray4,
  },

  formDescription: {
    fontSize: vh(2.2),
    height: vh(8),
    color: theme.gray.gray4,
    backgroundColor: theme.primary.alt,
  },
  View:{
    paddingHorizontal:10,
    backgroundColor: theme.primary.alt,
    borderRadius: theme.curves.md,
  },

  type: {
    flexDirection: "row",
    backgroundColor: theme.primary.alt,
    height: vh(3),
    borderRadius: theme.curves.md,
    justifyContent: "center",
    alignItems: "center",
  },
  typeCategory: {
    width: "50%",
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.curves.sm,
  },
  //list
  categotyCard: {
    backgroundColor: theme.primary.alt,
    height: vh(4.3),
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: theme.curves.md,
  },
});
export default NewEntryBtn;
