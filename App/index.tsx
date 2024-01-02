import 'react-native-gesture-handler';
import React from 'react';

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ConversionContextProvider } from './util/ConversionContext';
import Navigation from './config/Navigation';

export default function App() {

    return (
        <ConversionContextProvider>
            <Navigation />
        </ConversionContextProvider>
    );
}