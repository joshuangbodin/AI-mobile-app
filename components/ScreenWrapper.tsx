import { View,StyleSheet} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface props{
    children: React.ReactNode;
    SafeArea?: boolean;
    Style : any
}

const ScreenWrapper = ({children , SafeArea=true , Style}:props) => {
    const {top} = useSafeAreaInsets();

    const paddingTop = top>0? 5 : top+10
  return (
    <View style={[styles.container , SafeArea &&{paddingTop} , Style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    }
})

export default ScreenWrapper