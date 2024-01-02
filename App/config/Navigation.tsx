import React from "react";
import {
    NavigationContainer,
    NavigatorScreenParams,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Home from "../screens/Home";
import Options from "../screens/Options";
import { RootStackNavigatorType } from "./types";
import CurrencyList from "../screens/CurrencyList";
import colors from "../constants/colors";

const MainStack = createStackNavigator<RootStackNavigatorType>();

export default function Navigation() {
    return (
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Group>
                    <MainStack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <MainStack.Screen name="Options" component={Options} />
                </MainStack.Group>
                <MainStack.Group
                    screenOptions={{
                        presentation: "modal",
                        gestureEnabled: true,
                    }}
                >
                    <MainStack.Screen
                        name="CurrencyList"
                        component={CurrencyList}
                        options={({ route, navigation }) => ({
                            headerTitleAlign: 'center',
                            title: route.params.title,
                            headerLeft: () => (<></>),
                            headerRight: () => (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => navigation.pop()}
                                >
                                    <Entypo
                                        name="cross"
                                        size={30}
                                        color={colors.blue}
                                    />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                </MainStack.Group>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
