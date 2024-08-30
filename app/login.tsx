import { View, Text, StyleSheet, TextInput, Switch, KeyboardAvoidingView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import GoBackBtn from '@/components/ui/GoBackBtn'
import CustomText from '@/components/typography/text'
import { theme } from '@/constants/theme'
import CustomButton from '@/components/ui/button'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { vh } from '@/helpers/responsivesizes'
import { user } from '@/types/app.t'
import { authenticateUser, deleteUserInfo, retrieveUserData, storeUserData } from '@/appStorage/user/user'
import { router } from 'expo-router'

const login = () => {
    const [loading, setLoading] = useState(false)
    const [formInput, setFormInput] = useState<user>({
        name: '',
        password: '',
        dateCreated: '',
        appLock: false,
    })


    const verify = async () => {
        setLoading(true)
        const { name, password } = formInput
        if (!name || !password) {
            setLoading(false)
            return
        }

        try {
            const data = await authenticateUser(name , password)

            if (data.success) {
                setLoading(false)
                router.push('home')
                return;
            } else {
                setLoading(false)
                console.log(data.data)
            }

        } catch (err: any) {
            console.log('error', err.message)
        }

    }

    const deleteUser = async()=>{
        await deleteUserInfo()
        router.push('/')
        return;
    }



    return (
        <ScreenWrapper SafeArea>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={style.container}>


                {/* Go Back Btn */}
                <GoBackBtn />


                {/* Greeting  */}
                <View >
                    <CustomText isheader>
                        Welcome <Text style={style.designtext}>Back,</Text>
                    </CustomText>
                    <CustomText isheader>
                        <Text style={style.designtext}>Please</Text> Verify
                    </CustomText>
                    <CustomText isheader>
                        Its <Text style={style.designtext}>You.</Text>
                    </CustomText>
                </View>



                {/* form */}
                <View style={style.form}>

                    <View style={{ 
                        width:'100%',
                        alignSelf: 'flex-start',
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', paddingRight:10,
                         }}>

                        <CustomText style={{ alignSelf: 'flex-start' }} isSupporting text='Please log in to continue' />


                         <TouchableOpacity onPress={deleteUser}>
                            <FontAwesome6 name='trash-alt' size={vh(2)} color={'red'}/>
                         </TouchableOpacity>
                    </View>


                    <View style={style.textInput}>
                        <Feather name='user' color={theme.gray.gray1} size={vh(2.5)} />
                        <TextInput
                            value={formInput.name}
                            onChangeText={(value) => setFormInput({ ...formInput, name: value })}
                            style={style.input}
                            placeholder='Please enter your name'
                            placeholderTextColor={theme.gray.gray1}
                        />
                    </View>


                    <View style={[style.textInput, formInput.password.length == 0 ? {} : formInput.password.length < 6 ? { borderColor: 'red' } :
                        formInput.password.length < 8 ? { borderColor: 'yellow' } :
                            { borderColor: 'green' }]}>
                        <Feather name='lock' color={theme.gray.gray1} size={vh(2.5)} />
                        <TextInput
                            value={formInput.password}
                            onChangeText={(value) => setFormInput({ ...formInput, password: value })}
                            style={[style.input,

                            ]}
                            placeholder='Please enter your password'
                            secureTextEntry
                            placeholderTextColor={theme.gray.gray1}
                        />
                    </View>




                </View>


                {/* submit btn */}
                {loading ?
                    <ActivityIndicator color={theme.primary.normal} />
                    :
                    <CustomButton style={{ alignSelf: 'center' }} onPress={verify} title='Verify' />
                }

            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        gap: 35,
        paddingBottom: 40,
    },

    //greeting
    designtext: {
        color: theme.gray.gray2,
    },

    //form
    form: {
        height: vh(35),
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 'auto',
    },

    textInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 15,
        alignItems: 'center',
        height: vh(8),
        borderWidth: 1,
        borderColor: theme.gray.gray1,
        borderRadius: theme.curves.lg,

    },
    input: {
        flex: 1,
        marginHorizontal: 20,
        borderWidth: 0,
        height: '100%',
        fontSize: vh(2.2),
        color: theme.gray.white


    }
})

export default login