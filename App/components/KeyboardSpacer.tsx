import React, { useEffect, useState } from 'react';
import { View, Keyboard, Dimensions, StyleSheet } from 'react-native'

interface PropsInterface {
    onToggle: (keyboardIsVisible: boolean) => void;
}

const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0
    }
});

export default function KeyboardSpacer({ onToggle }: PropsInterface) {
    const [keyboardSpace, setKeyboardSpace] = useState(0);

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
            // Tamaño del largo en pixeles del teclado del dispositivo
            const keyboardHeight = e.endCoordinates.height;
            
            // Seteamos el tamaño del espaciador segun el tamaño del teclado
            setKeyboardSpace(keyboardHeight);
            onToggle(true);
        })

        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardSpace(0);
            onToggle(false);
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        }
    }, []);

    return(
        <View style={[styles.container, { height: keyboardSpace }]} />
    )
}