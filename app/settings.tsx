import {

  Image,

  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CustomText from "@/components/typography/text";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { vh, vw } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import { deleteUserInfo, retrieveUserData, updateUserName } from "@/appStorage/user/user";
import { router } from "expo-router";
import { clearList } from "@/appStorage/transactions/transactions";
import { user } from "@/types/app.t";
import CustomButton from "@/components/ui/button";
import { showToast } from "@/components/toast/createToast";
import Toast from "@/components/toast/toast";
import { Name } from "./_layout";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const settings = () => {
  const [user, setUser] = useState<user>();
  const [date, setDate] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [userName , setUserName] = useContext(Name)
  const [msg , setMsg] = useState('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    initializeUser();
  }, [error]);

  const initializeUser = async () => {
    const { data } = await retrieveUserData();

    if (data) {
      setUser(data);
      setUserName(data.name)
    }
  };

  const getDate = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    setDate(getDateFormated(hours, minutes));
  };

  setInterval(getDate, 50);

  const getDateFormated = (hours: number, minutes: number) => {
    if (hours > 12) {
      return `${hours - 12} : ${minutes > 9 ? minutes : "0" + minutes} PM`;
    }

    return `${hours} : ${minutes > 9 ? minutes : "0" + minutes}AM`;
  };

  return (
    <ScreenWrapper SafeArea>
      {msg&&<Toast type={error? 'error' : 'success'} message={msg} />}


      {/* Top */}
      <GoBackBtn />

      {/* List */}
      <Animated.ScrollView entering={FadeIn}>
        {/* date */}
        <Animated.View entering={FadeIn} style={style.date}>
          <CustomText isheader text={date} />
          <Image
            style={style.dateImg}
            source={require("../assets/images/grad.jpg")}
          />
        </Animated.View>

        <CustomText
          style={{ marginTop: 30 }}
          isCentered
          isSupporting
          text="User Info"
        />
        {editable ? (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={style.inputView}>
            <TextInput placeholder={'Name'} value={userName} onChangeText={setUserName} placeholderTextColor={theme.gray.gray2}  style={style.input}/>
          </Animated.View >
        ) : (
          <SettingItem
            name="User Name"
            onPress={() => {}}
            icon={() => (
              <CustomText isSupporting text={user ? user.name : "not found"} />
            )}
          />
        )}
        {editable ? (
          <CustomButton
            title="Save"
            onPress={async() => {
              const{data} = await updateUserName(userName);
              if (data){
                showToast(data , setMsg)
                setError(false)
                initializeUser()
              } 
              else{
                showToast(data , setMsg)
                setError(true)
                initializeUser()
              }
              setEditable(!editable)
            }}
            isFullWidth={false}
            style={style.btn}
            textstyle={{fontSize:vh(1.8), fontWeight:'semibold'}}
          />
        ) : (
          <SettingItem
            name="Edit User Info"
            onPress={() => {
              setEditable(true);
            }}
            icon={() => (
              <FontAwesome6 name="pen" size={vh(3)} color={theme.gray.gray1} />
            )}
          />
        )}

        <CustomText
          style={{ marginTop: 30 }}
          isCentered
          isSupporting
          text="Delete Information"
        />
        <SettingItem
          name="Delete All Info"
          onPress={async () => {
            await deleteUserInfo();
            router.push("/");
            return;
          }}
          icon={() => (
            <FontAwesome6
              name="trash-alt"
              size={vh(3)}
              color={theme.gray.gray1}
            />
          )}
        />

        <SettingItem
          name="Clear Transaction List"
          onPress={async () => {
            await clearList();
            router.push("/home");
            return;
          }}
          icon={() => (
            <AntDesign
              name="closesquare"
              size={vh(3)}
              color={theme.gray.gray1}
            />
          )}
        />
      </Animated.ScrollView>
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
        <CustomText isSupporting size={vh(2.1)}>
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
    paddingHorizontal: 20,
  },

  date: {
    width: vw(90),
    height: vh(20),
    overflow: "hidden",
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: theme.curves.xxl,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dateImg: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -60,
  },
  btn:{
    height: vh(5),
   width:vw(90),
    marginTop:10,
    alignSelf:'center'
  },
  inputView:{
    height:vh(5),
    backgroundColor: theme.primary.dark,
    marginTop:10,
    marginHorizontal:20,
    borderRadius: theme.curves.md,

  }
  ,input:{
    flex:1,
    color: theme.gray.gray2,
    textTransform:'capitalize',
    paddingLeft:20,
    fontSize: vh(1.8),
    
  }
});
