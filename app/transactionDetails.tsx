import { View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GoBackBtn from '@/components/ui/GoBackBtn'
import ScreenWrapper from '@/components/ScreenWrapper'
import { router, useLocalSearchParams } from 'expo-router'
import CustomText from '@/components/typography/text'
import { transaction } from '@/types/app.t'
import { vh, vw } from '@/helpers/responsivesizes'
import { formatCurrency } from '@/helpers/pricecustomization'
import { randomCategoryColorGenerator } from '@/helpers/RandomGenerator'
import { theme } from '@/constants/theme'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { deleteFromList } from '@/appStorage/transactions/transactions'

const transactionDetails = () => {
    const { item } = useLocalSearchParams()
    const transactiondata: transaction = item ? JSON.parse(String(item)) : undefined

    const { name, description, amount, category, dateCreated, type } = transactiondata

    const HandleDelete = async ()=>{
        deleteFromList(transactiondata)
    }

    if (!transactiondata) {
        return (<ScreenWrapper>
            <GoBackBtn />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 300,
            }}>
                <Image

                    style={{
                        width: vw(40),
                        height: vw(40)
                    }}
                    source={require('../assets/images/empty.png')} />
                <CustomText isSupporting>Transation Details Not Found</CustomText>
            </View>
        </ScreenWrapper>)
    }
    return (
        <ScreenWrapper SafeArea>
            <GoBackBtn />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.container}
            >
                {/* name */}
                <View style={style.apart}>
                    <View style={{ height: '100%', justifyContent: 'space-between' }}>
                        <CustomText size={vh(4.4)} isheader>{name}</CustomText>
                        <CustomText isSupporting size={vh(1.6)}>{String(dateCreated)}</CustomText>
                    </View>
                    <CustomText size={vh(3)} isheader>{formatCurrency(Number(amount), true)}</CustomText>
                </View>

                {/* Type */}
                <View style={style.typeCont}>
                    <View style={[style.typecategory, { backgroundColor: type == 'income' ? 'rgba(0,255,0,.3)' : 'rgba(255,0,0,.3)' }]}><CustomText style={{ color: theme.gray.white }} isSupporting size={vh(1.4)}>{type}</CustomText></View>
                    <View style={[style.typecategory, { backgroundColor: randomCategoryColorGenerator(category) }]}><CustomText style={{ color: theme.gray.white }} isSupporting size={vh(1.4)}>{category}</CustomText></View>
                </View>

                {/* Description */}
                <View>
                    <CustomText isSupporting text='Description' />
                    <View style={style.canvas}>
                        <CustomText>
                           {description}
                        </CustomText>
                    </View>
                </View>

                {/* action btns */}
                <View style={style.justleft}>
                    <TouchableOpacity  style={style.actbtn}>
                        <FontAwesome6 size={vh(2.2)} color={theme.gray.gray3} name='pen' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={HandleDelete} style={style.actbtn}>
                        <FontAwesome6 size={vh(2.2)} color={'red'} name='trash-alt' />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </ScreenWrapper>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        gap: 30,
    },
    apart: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    typeCont: {
        flexDirection: "row",
        gap: 10
    },
    typecategory: {
        padding: 4,
        paddingTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.curves.sm,
        borderCurve: 'continuous'
    },
    canvas: {
        backgroundColor: theme.primary.dark,
        marginTop: 20,
        padding: 15,
        height: vh(40),
        borderRadius: theme.curves.xl
    },
    justleft:{
        flexDirection:'row',
        justifyContent:'flex-end',
        gap:8    
    },
    actbtn:{
        width:vw(15),
        height: vh(6),
        backgroundColor:theme.primary.dark,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:theme.curves.lg,
    }
})

export default transactionDetails