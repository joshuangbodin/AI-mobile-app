import { View, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../typography/text";
import { vh } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";

interface props {
  data: string[];
  name?: string;
}

const FieldList = ({ data, name }: props) => {
  return (
    <View style={{ gap: 5 , marginTop:25}}>
      {name && <CustomText isSupporting text={name + ":"} />}
      <View style={{ gap: 5 }}>
        {data.map((item: string , index:number) => (
          <View style={styles.item} key={index}>
            <LinearGradient colors={[theme.primary.normal, theme.primary.purple]} style={styles.numbers}>
                
            </LinearGradient>
            <CustomText size={vh(1.7)}>{item}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        height: vh(6),
        alignItems:'center',
        gap:20,
    },
    numbers:{
       width:vh(2),
       height: vh(2),
       borderRadius: theme.curves.round
    }
});

export default FieldList;
