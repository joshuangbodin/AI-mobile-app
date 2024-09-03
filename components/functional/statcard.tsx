import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { vh } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import CustomText from "../typography/text";

interface props {
  info: string;
  data: string | number;
  units: string;
  height?: number;
  textSize?:number;
}

const statcard = ({ info, data, units, height ,textSize }: props) => {
  return (
    <View style={[styles.container, height ? { height } : { height: vh(20) },]}>
      <CustomText isSupporting>{info}</CustomText>
      <CustomText size={textSize&&textSize} isheader>{data}</CustomText>
      <CustomText isSupporting>{units}</CustomText>
    </View>
  );
};

export default statcard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: vh(20),
    backgroundColor: theme.primary.dark,
    borderRadius: theme.curves.xl,
    justifyContent: "space-between",
    padding: 10,
    paddingVertical:vh(3)
  },
});
