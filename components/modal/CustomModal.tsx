import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { vh, vw } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";

interface props {
  visible: boolean;
  children?: ReactNode;
  setVisible: () => void;
  styles?: any;
  height?: number;
  closeBtn?: () => ReactNode;
}

const CustomModal = ({
  visible,
  children,
  setVisible,
  height,
  styles,
  closeBtn
}: props) => {
  return (
    <View
      style={[
        style.container,
        visible ? {} : style.hidden,
        styles && styles,
        height && { height },
      ]}
    >
      
        
        <TouchableOpacity style={{ height: vh(3) }} onPress={setVisible}>
          {closeBtn ? closeBtn() :<View style={style.btn}></View>}
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
    bottom: 0,
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
