import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CustomText from "@/components/typography/text";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { vh } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import { deleteUserInfo } from "@/appStorage/user/user";
import { router } from "expo-router";

const settings = () => {
  return (
    <ScreenWrapper SafeArea>
      {/* Top */}
      <GoBackBtn />

      {/* List */}
      <ScrollView>
        <SettingItem
          name="Delete All Info"
          onPress={async () => {
            await deleteUserInfo();
            router.push("/");
            return;
          }}
          icon={() => (
            <FontAwesome6 name="trash-alt" size={vh(3)} color="red" />
          )}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default settings;

interface SetProps {
  name: string;
  icon: () => React.ReactNode;
  onPress?: () => void;
}

const SettingItem = ({ name, icon, onPress }: SetProps) => {
  return (
    <View>
      <TouchableOpacity style={style.settingsCont} onPress={onPress}>
        <CustomText isheader size={vh(2.3)}>
          {name}
        </CustomText>
        {icon()}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  settingsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
});
