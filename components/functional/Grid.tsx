import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatCard from './statcard'
import CustomText from '../typography/text'
import { vh } from '@/helpers/responsivesizes'

const Grid = () => {
  return (
    <View style={{gap:10 , justifyContent:'center' , alignItems:'center'}}>
      <CustomText isSupporting>Transaction Data</CustomText>
      <View style={styles.grid}>
        <View style={styles.columns}>
          <StatCard info='Income' data={23000} units='Naira' height={vh(25)}/>
          <StatCard info='Income' data={23000} units='Naira' height={vh(15)}/>
        </View>
        <View style={styles.columns}>
          <StatCard info='Income' data={23000} units='Naira' height={vh(20)}/>
          <StatCard info='Income' data={23000} units='Naira' height={vh(20)}/>
        </View>
      </View>
    </View>
  )
}

export default Grid

const styles = StyleSheet.create({
  grid:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-evenly'
  },
  columns:{
    width: '50%',
    paddingHorizontal:4,
    gap:8
  }
})