import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

interface PropsInterface {
    text: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
    },
});

export default function Button({ text, onPress }: PropsInterface) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image
                source={require("../assets/icons/reverse.png")}
                style={styles.buttonIcon}
                resizeMode="contain"
            />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}
