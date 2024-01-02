import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardTypeOptions} from 'react-native';

import colors from '../constants/colors';

interface PropsInterface {
    text: string;
    value: string;
    onButtonPress: () => void;
    keyboardType: KeyboardTypeOptions;
    onChangeText?: (text: string) => void;
    editable: boolean;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    containerDisabled: {
        flexDirection: 'row',
        backgroundColor: colors.offWhite,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    button: {
        backgroundColor: colors.white,
        padding: 15,
        borderRightColor: colors.border,
        borderRightWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    buttonText: {
        fontSize: 16,
        color: colors.blue,
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        padding: 10,
        color: colors.textLight
    }
});

export default function ConversionInput({text, value, onButtonPress, keyboardType, onChangeText, editable}: PropsInterface) {
    return(
        <View style={editable ? styles.container : styles.containerDisabled}>
            <TouchableOpacity onPress={onButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input} 
                value={value} 
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                editable={editable}
                placeholder='0'
            />
        </View>
    )
}