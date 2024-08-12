import { View,StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

interface props{
    children: React.ReactNode;
    SafeArea?: boolean;
    Style?: any;
    scrollable?:boolean;
}

const ScreenWrapper = ({children , SafeArea=true ,scrollable=false, Style}:props) => {
    const {top} = useSafeAreaInsets();

    const paddingTop = top>0? 5 : top+10


if(scrollable){
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.container , SafeArea &&{paddingTop} , Style]}>
       {children}
    </ScrollView>
  )
}


  return (
    <View style={[styles.container , SafeArea &&{paddingTop} , Style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.primary.darker
    }
})

export default ScreenWrapper