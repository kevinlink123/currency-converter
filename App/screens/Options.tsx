import React, { useState, useContext } from "react";
import {
    StatusBar,
    ScrollView,
    SafeAreaView,
    Linking,
    Alert,
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";

import RowItem from "../components/RowItem";
import Separator from "../components/Separator";
import CurrencyExchangeRateService from "../util/services/CurrencyExchange.service";
import { ConversionContext } from "../util/ConversionContext";

const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {
        Alert.alert("Sorry, something went wrong.", "Please try again later.");
    });
};

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.offWhite,
        padding: 15,
        width: "90%",
        height: screen.height / 4,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 25,
        borderRadius: 12,
    },
});

export default () => {
    const { setRates } = useContext(ConversionContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateExchangeRates = async () => {
        try {
            setLoading(true);
            const newRates =
                await CurrencyExchangeRateService.forceUpdateCurrencyExchangeRates();
            setRates(newRates);
            setIsModalOpen(false);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                visible={isModalOpen}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.content}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            ARE YOU SURE YOU WANT TO UPDATE THE EXCHANGE RATES?
                        </Text>
                        <View style={styles.buttonContainer}>
                            {loading ? (
                                <ActivityIndicator
                                    color={colors.white}
                                    size="large"
                                />
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => updateExchangeRates()}
                                    >
                                        <Text
                                            style={{ color: colors.offWhite }}
                                        >
                                            CONFIRM
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => setIsModalOpen(false)}
                                    >
                                        <Text
                                            style={{ color: colors.offWhite }}
                                        >
                                            DISMISS
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <RowItem
                    rightIcon={
                        <Entypo
                            name="chevron-right"
                            size={20}
                            color={colors.blue}
                        />
                    }
                    onPress={() => {
                        setIsModalOpen(true);
                    }}
                    text="Update Exchange Rates Data"
                />

                <Separator />

                <RowItem
                    rightIcon={
                        <Entypo name="export" size={20} color={colors.blue} />
                    }
                    onPress={() => {
                        openUrl(
                            "https://learn.handlenarlabs.com/p/react-native-basics-build-a-currency-converter"
                        );
                    }}
                    text="React Native Basics"
                />

                <Separator />

                <RowItem
                    rightIcon={
                        <Entypo name="export" size={20} color={colors.blue} />
                    }
                    onPress={() => {
                        openUrl("https://reactnativebyexample.com");
                    }}
                    text="React Native By Example"
                />

                <StatusBar />
            </ScrollView>
        </SafeAreaView>
    );
};
