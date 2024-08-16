import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { theme } from '@/constants/theme'
import { vh, vw } from '@/helpers/responsivesizes'
import { router } from 'expo-router'
import CustomText from '../typography/text'
import CustomButton from '../ui/button'
import { categories } from '@/constants/functional'
import { transaction } from '@/types/app.t'



const NewEntryBtn = () => {


    const [isOpen, setIsOpen] = useState<Boolean>(true)

    const [transaction, setTransaction] = useState<transaction>({
        name: '',
        description: '',
        amount: '',
        type: 'income',
        category: '',
        dateCreated: ''
    })


    return (
        <View style={styles.cont}>
            {/* pop up */}
            {isOpen &&
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} style={styles.form}>
                    {/* form head */}
                    <CustomText isSupporting size={vh(2.5)} text='New Entry' />

                    {/* name */}
                    <TextInput
                        value={transaction.name}
                        onChangeText={(value)=> setTransaction({...transaction, name:value})}
                        style={styles.formName}
                        placeholder='Transaction Name'
                        placeholderTextColor={theme.gray.gray2}
                    />

                    {/* Amount */}
                    <TextInput
                        value={transaction.amount}
                        onChangeText={(value)=> setTransaction({...transaction, amount:value})}
                        keyboardType='numeric'
                        style={styles.formDescription}
                        placeholder='Amount ...'
                        multiline
                        placeholderTextColor={theme.gray.gray2}
                    />

                    {/* description */}
                    <TextInput
                        value={transaction.description}
                        onChangeText={(value)=> setTransaction({...transaction, description:value})}
                        style={styles.formDescription}
                        placeholder='Description ...'
                        multiline
                        placeholderTextColor={theme.gray.gray2}
                    />

                    {/* type toggle */}
                    <View style={styles.type}>

                        <TouchableOpacity
                            onPress = {()=>{setTransaction({...transaction , type:'income'})}}
                            style={[
                                styles.typeCategory,
                                transaction.type == 'income' &&
                                {
                                    backgroundColor: theme.primary.darker
                                }]}>

                            <CustomText text='Income'></CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress = {()=>{setTransaction({...transaction , type:'expenditure'})}}
                            style={[
                                styles.typeCategory,
                                transaction.type == 'expenditure' &&
                                {
                                    backgroundColor: theme.primary.darker
                                }]}>

                           
                            <CustomText text='expenditure'></CustomText>
                        </TouchableOpacity>

                    </View>

                    {/* category */}
                    <View>
                        <CustomText text='categories:' isSupporting />
                        <FlatList
                            horizontal
                            data={categories.expense}
                            renderItem={({ item }) =>
                            (<TouchableOpacity
                            onPress={()=> {setTransaction({...transaction,category:item})}}
                             style={[styles.categotyCard , transaction.category == item&&{backgroundColor: theme.primary.darker}]}>
                                <CustomText text={item} />
                            </TouchableOpacity>)
                            }
                            style={{ marginTop: 5 } }
                            contentContainerStyle={{
                                gap: 5
                            }}
                        />
                    </View>



                    {/* button */}
                    <CustomButton textstyle={{ fontWeight: '500', fontSize: vh(2) }} isFullWidth={false} style={{ height: vh(6) }} onPress={() => { }} title='Create Entry' />
                </KeyboardAvoidingView>}

            {/* button */}
            <TouchableOpacity onPress={() => { setIsOpen(!isOpen) }} style={[styles.btn]}>
                <Ionicons size={vh(4.5)} color={theme.gray.white} name={isOpen ? 'close-outline' : 'add'} />
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        position: 'absolute',
        bottom: vh(3.5),
        right: 4,
        gap: 10,
    },
    btn: {

        width: vw(15),
        height: vw(15),
        backgroundColor: theme.primary.normal,
        borderRadius: theme.curves.full,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    //form
    form: {
        position: 'relative',
        width: vw(94),
        minHeight: vh(70),
        backgroundColor: theme.primary.dark,
        alignSelf: 'flex-end',
        right: 0,
        borderRadius: 30,
        padding: 15,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    formName: {
        width: '100%',
        fontSize: vh(2.2),
        height: vh(4.5),
        borderBottomWidth: 1,
        borderBottomColor: theme.gray.gray3,
        color: theme.gray.gray3
    },

    formDescription: {
        fontSize: vh(2.2),
        height: vh(4.5),
        borderBottomWidth: 1,
        borderBottomColor: theme.gray.gray3,
        color: theme.gray.gray3
    },

    type: {
        flexDirection: 'row',
        backgroundColor: theme.primary.alt,
        height: vh(5),
        borderRadius: theme.curves.md,
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeCategory: {
        width: vw(40),
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.curves.sm
    }
    ,

    //list
    categotyCard: {
        backgroundColor: theme.primary.alt,
        height: vh(5),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: theme.curves.md
    }

})
export default NewEntryBtn