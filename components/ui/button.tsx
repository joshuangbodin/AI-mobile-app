import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { vh, vw } from '@/helpers/responsivesizes';
import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';


interface props {
    title: string;
    onPress: () => void;
    isFullWidth?: boolean;
    style?: any;
    textstyle?: any;
}

const CustomButton = ({ title, onPress, isFullWidth = true, style, textstyle }: props) => {
    return (
        <TouchableOpacity  onPress={onPress}>
            <LinearGradient colors={[theme.primary.deepblue, theme.primary.purple, theme.primary.dark,]}
                style={[
                    isFullWidth ? styles.btnContainer : { ...styles.btnContainer, width: 'auto' },
                    style

                ]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: -2 }}>
                <Text style={[styles.btntext, textstyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: vw(95),
        height: vh(8),
        backgroundColor: theme.primary.normal,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.curves.lg,
        borderCurve: 'continuous',

    },

    btntext: {
        fontSize: vh(2.5),
        color: theme.gray.white,
        fontWeight: '700'
    }

})

export default CustomButton