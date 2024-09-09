import { TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { vh } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import { router } from "expo-router";

interface props {
  route?: string;
}

const GoBackBtn = ({ route }: props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (route) {
          router.push(route);
          return;
        }
        router.back();
        return;
      }}
    >
      <Feather name="chevron-left" size={vh(4)} color={theme.gray.white} />
    </TouchableOpacity>
  );
};

export default GoBackBtn;
