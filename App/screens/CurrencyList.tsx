import React, { useContext } from "react";
import {
    Dimensions,
    FlatList,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";
import currencies from "../data/currencies.json";
import RowItem from "../components/RowItem";
import Separator from "../components/Separator";
import { ConversionContext } from "../util/ConversionContext";
import { CurrencyListScreenProps } from "./types/CurrencyListScreenProps.type";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: colors.blue,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
});

const screen = Dimensions.get("window");

export default ({ navigation, route }: CurrencyListScreenProps) => {
    const params = route.params;
    const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } = useContext(ConversionContext);

    return (
        <View style={styles.container}>

            <FlatList
                data={currencies}
                renderItem={({ item }) => {
                    const activeCurrency = params.isBaseCurrency ? baseCurrency : quoteCurrency;
                    const selected = activeCurrency === item;
                    return (
                        <RowItem
                            text={item.toLocaleUpperCase()}
                            onPress={() => {
                                if(params.isBaseCurrency) {
                                    setBaseCurrency(item);
                                } else {
                                    setQuoteCurrency(item);
                                }
                                navigation.pop();
                            }}
                            rightIcon={
                                selected ? (
                                    <View style={styles.icon}>
                                        <Entypo
                                            name="check"
                                            size={20}
                                            color={colors.white}
                                        />
                                    </View>
                                ) : null
                            }
                        />
                    );
                }}
                ItemSeparatorComponent={Separator}
                ListFooterComponent={() => (
                    <View style={{ marginBottom: screen.height * 0.02 }} />
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};
