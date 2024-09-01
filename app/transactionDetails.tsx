import { View, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import GoBackBtn from '@/components/ui/GoBackBtn'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useLocalSearchParams } from 'expo-router'
import CustomText from '@/components/typography/text'
import { transaction } from '@/types/app.t'
import { vh, vw } from '@/helpers/responsivesizes'
import { formatCurrency } from '@/helpers/pricecustomization'
import { randomCategoryColorGenerator } from '@/helpers/RandomGenerator'
import { theme } from '@/constants/theme'

const transactionDetails = () => {
    const { item } = useLocalSearchParams()
    const transactiondata: transaction = item ? JSON.parse(String(item)) : undefined

    const { name, description, amount, category, dateCreated, type } = transactiondata

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
                    <View>
                        <CustomText size={vh(4.4)} isheader>{name}</CustomText>
                        {/* Type */}
                        <View style={style.typeCont}>
                            <View style={[style.typecategory, { backgroundColor: type == 'income' ? 'green' : 'red' }]}><CustomText style={{color:theme.gray.white}} isSupporting size={vh(1.4)}>{type}</CustomText></View>
                            <View style={[style.typecategory, { backgroundColor: randomCategoryColorGenerator(category) }]}><CustomText style={{color:theme.gray.white}} isSupporting size={vh(1.4)}>{category}</CustomText></View>
                        </View>
                    </View>
                    <CustomText size={vh(3.4)} isheader>{formatCurrency(Number(amount), true)}</CustomText>
                </View>


            </ScrollView>
        </ScreenWrapper>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        gap: 3,
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
        paddingTop:2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.curves.sm,
        borderCurve: 'continuous'
    }
})

export default transactionDetails