import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../constants/colors";

interface RowItemProps {
    rightIcon: any;
    text: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 16,
        color: colors.text,
    },
});

export default function RowItem({ rightIcon, text, onPress }: RowItemProps) {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            {rightIcon}
        </TouchableOpacity>
    );
};
