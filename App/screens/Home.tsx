import React, { useContext, useState } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { format } from "date-fns";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


import colors from "../constants/colors";
import ConversionInput from "../components/ConversionInput";
import Button from "../components/Button";
import KeyboardSpacer from "../components/KeyboardSpacer";
import { ConversionContext } from "../util/ConversionContext";
import { HomeScreenProps } from "./types";



const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    content: {
        paddingTop: screen.height * 0.15,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    logoBackground: {
        width: screen.width * 0.45,
        height: screen.height * 0.25,
    },
    logo: {
        position: "absolute",
        width: screen.width * 0.25,
        height: screen.height * 0.25,
    },
    textHeader: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 20,
        textAlign: "center",
    },
    text: {
        color: colors.white,
        fontSize: 13,
        textAlign: "center",
    },
    header: {
        alignItems: "flex-end",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ({ navigation }: HomeScreenProps) => {
    const [baseValue, setBaseValue] = useState("");
    const date = new Date();

    const {
        loading,
        baseCurrency,
        quoteCurrency,
        swapCurrencies,
        conversionRate,
    } = useContext(ConversionContext);

    const [scrollEnabled, setScrollEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: "100%" }} scrollEnabled={scrollEnabled}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.blue}
                />
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.push('Options')}
                    >
                        <Entypo name="cog" size={32} color={colors.white} />
                    </TouchableOpacity>
                </SafeAreaView>

                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../assets/images/background.png")}
                            style={styles.logoBackground}
                            resizeMode="contain"
                        />
                        <Image
                            source={require("../assets/images/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.textHeader}>Currency Converter</Text>

                    {loading ? (
                        <ActivityIndicator color={colors.white} size="large" />
                    ) : (
                        <>
                            <ConversionInput
                                text={baseCurrency}
                                value={baseValue}
                                onButtonPress={() =>
                                    navigation.push("CurrencyList", {
                                        title: "Base Currency",
                                        isBaseCurrency: true,
                                    })
                                }
                                onChangeText={(text) => setBaseValue(text)}
                                keyboardType="numeric"
                                editable={true}
                            />

                            <ConversionInput
                                text={quoteCurrency}
                                value={
                                    baseValue &&
                                    `${(
                                        parseFloat(baseValue) * conversionRate
                                    ).toFixed(2)}`
                                }
                                onButtonPress={() =>
                                    navigation.push("CurrencyList", {
                                        title: "Quote Currency",
                                        isBaseCurrency: false,
                                    })
                                }
                                keyboardType="numeric"
                                editable={false}
                            />

                            <Text style={styles.text}>
                                {`1 ${baseCurrency} = ${conversionRate.toFixed(
                                    3
                                )} ${quoteCurrency} as of ${format(
                                    date,
                                    "MMMM do, yyyy"
                                )}`}
                            </Text>

                            <Button
                                text="Reverse Currencies"
                                onPress={() => swapCurrencies()}
                            />
                        </>
                    )}

                    <KeyboardSpacer
                        onToggle={(keyboardIsVisible) =>
                            setScrollEnabled(keyboardIsVisible)
                        }
                    />
                </View>
            </ScrollView>
        </View>
    );
};
