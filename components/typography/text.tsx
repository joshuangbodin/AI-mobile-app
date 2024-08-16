import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { vh } from '@/helpers/responsivesizes';
import { theme } from '@/constants/theme';

interface props {
    text?: string;
    isheader?: boolean;
    isSupporting?: boolean;
    isCentered?: boolean;
    style?: any;
    children?: React.ReactNode;
    size?:number;
}


const CustomText = ({
    text,
    isheader = false,
    style,
    isSupporting = false,
    isCentered = false,
    children,
    size
}
    : props) => {

    if (children) {
        return (
            <Text
                style={[
                    styles.text,
                    isheader ? styles.headertext : isSupporting && styles.supporting,
                    isCentered && { textAlign: 'center' },
                    style,
                    size&&{fontSize:size}
                ]}
            >
                {children}
            </Text>
        )
    }


    return (
        <Text
            style={[
                styles.text,
                isheader ? styles.headertext : isSupporting && styles.supporting,
                isCentered && { textAlign: 'center' },
                style,
                size&&{fontSize:size}
            ]}
        >
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: vh(2),
        color: theme.gray.white,

    },
    headertext: {
        fontSize: vh(3.5),
        color: theme.gray.white,
        fontWeight: 'bold'

    },
    supporting: {
        fontSize: vh(1.8),
        color: theme.gray.gray2,
        fontWeight: '600'
    },

})

export default CustomText