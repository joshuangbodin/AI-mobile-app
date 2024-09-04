import { View, Text, StyleSheet, TextInput, Switch, KeyboardAvoidingView, Alert, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import GoBackBtn from '@/components/ui/GoBackBtn'
import CustomText from '@/components/typography/text'
import { theme } from '@/constants/theme'
import CustomButton from '@/components/ui/button'
import { Feather } from '@expo/vector-icons'
import { vh } from '@/helpers/responsivesizes'
import { user } from '@/types/app.t'
import { retrieveUserData, storeUserData } from '@/appStorage/user/user'
import { router } from 'expo-router'
import Toast from '@/components/toast/toast'
import { showToast } from '@/components/toast/createToast'

const register = () => {
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState<string>('')
    const [formInput, setFormInput] = useState<user>({
        name: '',
        password: '',
        appLock: false,
        dateCreated: new Date,
    })

    useEffect(() => {
        checkIfUserExists()
    }, [])


    const checkIfUserExists = async () => {
        setLoading(true)

        const data = await retrieveUserData()

        if (data.success) {
            if (data.data.appLock) {
                setLoading(false)
                router.push('/login')
                return;
            }

            setLoading(false)
            router.push('/home')
            return;

        }
        else {
            //console.log(data)
           // showToast(data.data , setError)
            setLoading(false)
        }

    }


    const register = async () => {
        setLoading(true)
        const data = await storeUserData(formInput)

        if (data.success) {
            setLoading(false)
            router.push('/home')
        }
        else {
            setLoading(false)
            //console.log('error:', data.data)
            showToast(data.data , setError)
           // Alert.alert('Registration Error', data.data)
        }

    }


    return (
        <ScreenWrapper SafeArea>
            {error&&<Toast type='error' message={error}/>}
            <ScrollView  contentContainerStyle={style.container}>
                {/* Go Back Btn */}
                <GoBackBtn />


                {/* Greeting  */}
                <View >
                    <CustomText isheader>
                        Register <Text style={style.designtext}>to</Text>
                    </CustomText>
                    <CustomText isheader>
                        <Text style={style.designtext}>Stop</Text> Excessive
                    </CustomText>
                    <CustomText isheader>
                        Spending <Text style={style.designtext}>Today.</Text>
                    </CustomText>
                </View>


                {/* form */}
                <View style={style.form}>
                    <CustomText style={{ alignSelf: 'flex-start' }} isSupporting text='Please provide the following information' />
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
                    <View style={[style.textInput, { borderWidth: 0, paddingHorizontal: 15 }]}>
                        <CustomText isSupporting text='always sign in with name & password' />
                        <Switch
                            value={formInput.appLock}
                            onValueChange={() => setFormInput({ ...formInput, appLock: !formInput.appLock })}
                            trackColor={{ true: theme.primary.normal, false: theme.gray.gray2 }}
                            thumbColor={'white'}
                        />
                    </View>

                </View>


                {/* submit btn */}
                {loading ? <ActivityIndicator color={theme.primary.normal} /> : <CustomButton style={{ alignSelf: 'center' }} onPress={register} title='Register' />}
            </ScrollView>
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
    designtext:{
        color:theme.gray.gray2,
    },
    
    //form
    form: {
        height: vh(40),
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

export default register