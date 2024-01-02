import React, { FC, createContext, useEffect, useState } from "react";
import initialValues from "../constants/initialValues";
import currencyExchangeRateService from "./services/CurrencyExchange.service";

type ContextType = {
    baseCurrency: string;
    setBaseCurrency: (newCurrency: string) => void;
    quoteCurrency: string;
    setQuoteCurrency: (newCurrency: string) => void;
    conversionRate: number;
    swapCurrencies: () => void;
    loading: boolean;
    setLoading: (isLoading: boolean) => void;
    setRates: (newRates: any) => void;
};

export const ConversionContext = createContext<ContextType>({} as ContextType);

export const ConversionContextProvider = (props: { children: any }) => {
    const [baseCurrency, _setBaseCurrency] = useState(
        initialValues.baseCurrency
    );
    const [quoteCurrency, _setQuoteCurrency] = useState(
        initialValues.quoteCurrency
    );
    const [conversionRate, setConversionRate] = useState(0);
    const [rates, setRates] = useState();

    const [loading, setLoading] = useState(true);

    const setBaseCurrency = (newCurrency: string) => {
        _setBaseCurrency(newCurrency);
        const newConversionRate =
            currencyExchangeRateService.getCurrencyExchangeRates(
                newCurrency,
                quoteCurrency,
                rates
            );
        setConversionRate(newConversionRate);
    };

    const setQuoteCurrency = (newCurrency: string) => {
        _setQuoteCurrency(newCurrency);
        const newConversionRate =
            currencyExchangeRateService.getCurrencyExchangeRates(
                baseCurrency,
                newCurrency,
                rates
            );
        setConversionRate(newConversionRate);
    };

    const swapCurrencies = () => {
        const newConversionRate =
            currencyExchangeRateService.getCurrencyExchangeRates(
                quoteCurrency,
                baseCurrency,
                rates
            );
        setConversionRate(newConversionRate);
        _setBaseCurrency(quoteCurrency);
        _setQuoteCurrency(baseCurrency);
    };

    useEffect(() => {
        async function fetchCurrencyExchanceRates() {
            setLoading(true);
            const data =
                await currencyExchangeRateService.getUsdBasedCurrencyExchangeRates();

            data.usd = initialValues.usdExchangeData;
            data.createdAt = new Date().getTime();

            const initialConversionRate =
                currencyExchangeRateService.getCurrencyExchangeRates(
                    initialValues.baseCurrency,
                    initialValues.quoteCurrency,
                    data
                );
            setRates(data);
            setConversionRate(initialConversionRate);
            setLoading(false);
        }
        fetchCurrencyExchanceRates();
    }, []);

    const contextValue: ContextType = {
        baseCurrency,
        setBaseCurrency,
        quoteCurrency,
        setQuoteCurrency,
        conversionRate,
        swapCurrencies,
        loading,
        setLoading,
        setRates,
    };

    return (
        <ConversionContext.Provider value={contextValue}>
            {props.children}
        </ConversionContext.Provider>
    );
};
