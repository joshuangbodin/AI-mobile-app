import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { vh } from '@/helpers/responsivesizes';
import { theme } from '@/constants/theme';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text'


interface props {
    text?: string;
    isheader?: boolean;
    isSupporting?: boolean;
    isCentered?: boolean;
    style?: any;
    children?: React.ReactNode;
    size?:number;
    autosize? : boolean;
}


const CustomText = ({
    text,
    isheader = false,
    style,
    isSupporting = false,
    isCentered = false,
    children,
    size,
    autosize = false
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

    if(autosize){
        return(
            <AutoSizeText
            minFontSize={10}
            numberOfLines={1}
            fontSize={size? size : vh(1.3)}
            mode={ResizeTextMode.min_font_size}
            style={[
                styles.text,
                isheader ? styles.headertext : isSupporting && styles.supporting,
                isCentered && { textAlign: 'center' },
                style,
                size&&{fontSize:size}
            ]}
            >
                {text}
            </AutoSizeText>
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
        textTransform:'capitalize'
    },
    headertext: {
        fontSize: vh(3.5),
        color: theme.gray.white,
        fontWeight: 'bold',
        textTransform:'capitalize'
    },
    supporting: {
        fontSize: vh(1.8),
        color: theme.gray.gray2,
        fontWeight: '600',
        textTransform:'capitalize'
    },

})

export default CustomText