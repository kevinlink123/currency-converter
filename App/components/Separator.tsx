import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../constants/colors";

const styles = StyleSheet.create({
    separator: {
        backgroundColor: colors.border,
        height: StyleSheet.hairlineWidth,
        marginLeft: 20,
    },
});

export default function Separator() {
    return <View style={styles.separator} />;
}
