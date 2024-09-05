import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { vh, vw } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import Animated, { FadeInDown, FadeOutDown, SlideInDown, SlideOutDown } from "react-native-reanimated";

interface props {
  visible: boolean;
  children?: ReactNode;
  setVisible: () => void;
  styles?: any;
  height?: number;
  closeBtn?: () => ReactNode;
  background?: string;
}

const CustomModal = ({
  visible,
  children,
  setVisible,
  height,
  styles,
  closeBtn,
  background
}: props) => {
  return (
    <Animated.View
    entering={SlideInDown}
    exiting={SlideOutDown}
      style={[
        style.container,
        visible ? {} : style.hidden,
        styles && styles,
        height && { height },
        closeBtn && { left: -4 },
        {backgroundColor:background}
      ]}
    >
      <TouchableOpacity style={{ minHeight: vh(3) }} onPress={setVisible}>
        {closeBtn ? closeBtn() : <View style={style.btn}></View>}
      </TouchableOpacity>

      {children}
    </Animated.View>
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
    backgroundColor: theme.primary.black,
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
