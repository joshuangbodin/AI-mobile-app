import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { vh, vw } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";

interface props {
  visible: boolean;
  children?: ReactNode;
  setVisible: () => void;
}

const CustomModal = ({ visible, children , setVisible}: props) => {
  return (
    <View style={[style.container, visible ? {} : style.hidden]}>
      <TouchableOpacity style={{height:vh(5)}}  onPress={setVisible} >
        <View style={style.btn}></View>
      </TouchableOpacity>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  hidden: {
    display: "none",
  },

  container: {
    position: "absolute",
    width: vw(100),
    height: vh(70),
    backgroundColor: theme.primary.dark,
    left: 0,
    bottom: -10,
    borderRadius: theme.curves.xxl,
    padding: 10,
  },

  btn: {
    width: vw(20),
    height: vh(1),
    backgroundColor: theme.primary.alt,
    borderRadius: theme.curves.round,
    alignSelf: "center",
  },
});

export default CustomModal;
