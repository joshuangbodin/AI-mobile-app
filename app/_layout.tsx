import React, { Context, createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Stack } from "expo-router";

export const Name =  createContext<string| any>('')

const _layout = () => {
  const [userName , setUserName] = useState(Name)
  
  return (
    <Name.Provider value={[userName,setUserName]}>
      <Stack
      initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </Name.Provider>
  );
};

export default _layout;
