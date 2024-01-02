import * as FileSystem from 'expo-file-system';
import initialValues from '../../constants/initialValues';

class CurrencyExchangeService {
    baseUrl = "https://www.floatrates.com/daily/";
    
    documentDirectory = FileSystem.documentDirectory;

    oneDayInMS = 24 * 60 * 60 * 1000;

    async forceUpdateCurrencyExchangeRates() {
        const file = await this.readJsonDataFromDisk('rates.json');

        if(file.exists) {
            console.log("Deleting old file");
            await this.deleteJsonDataFromDisk('rates.json');
        }

        // Descarga un json con la información y se guarda en el directorio de la app.
        const res = await fetch(`${this.baseUrl}usd.json`);
        const data = await res.json();
        
        // Agrega los datos de usd que no vienen incluidos al ser todos los cambios basados
        // en el dolar estadounidense
        data.usd = initialValues.usdExchangeData;
        
        // Agrega un campo que indica cuando fue creado
        data.createdAt = new Date().getTime();
        await this.saveJsonDataToDisk(data, 'rates.json');
        return data;
    }

    async getUsdBasedCurrencyExchangeRates() {
        // Chequea si ya se creó el archivo json con los datos de exchange rates. Si existe,
        // devuelve su contenido parseado.

        const file = await this.readJsonDataFromDisk('rates.json');

        if(file.exists && !this.isFileOneDayOld(file.content.createdAt)) {
            console.log("File already exists in document directory and its was recently downloaded");
            
            return file.content;
        }

        // Descarga un json con la información y se guarda en el directorio de la app.
        const res = await fetch(`${this.baseUrl}usd.json`);
        const data = await res.json();
        
        // Agrega los datos de usd que no vienen incluidos al ser todos los cambios basados
        // en el dolar estadounidense
        data.usd = initialValues.usdExchangeData;
        
        // Agrega un campo que indica cuando fue creado
        data.createdAt = new Date().getTime();
        await this.saveJsonDataToDisk(data, 'rates.json');
        return data;
    }

    getCurrencyExchangeRates(baseCurrency: string, quoteCurrency: string, rates: any) {
        const url = this.baseUrl;
        const baseConversionRateToUsd = rates[baseCurrency.toLowerCase()].rate;
        const quoteConversionRateToUsd =
            rates[quoteCurrency.toLowerCase()].rate;

        const conversionRate =
            quoteConversionRateToUsd / baseConversionRateToUsd;
        return conversionRate;
    }

    async fileExists(filePath: string) {
        const fileAlreadyExists = (await FileSystem.getInfoAsync(this.documentDirectory + filePath)).exists;
        return fileAlreadyExists;
    }

    async readJsonDataFromDisk(filePath: string) {
        try {
            const contentAsString = await FileSystem.readAsStringAsync(this.documentDirectory + filePath);
            const contentParsed = await JSON.parse(contentAsString);
            return {
                exists: true,
                content: contentParsed
            };
        } catch(e) {
            return {
                exists: false,
                content: {}
            };
        }
    }

    async saveJsonDataToDisk(jsonData: any, filePath: string) {
        // TODO: Implement save json file to device with expo file system module
        try {
            const fileAlreadyExists = (await FileSystem.getInfoAsync(this.documentDirectory + filePath)).exists;
            if (fileAlreadyExists) {
                console.log('File already exists');
                return;
            }
            const jsonString = JSON.stringify(jsonData);

            await FileSystem.writeAsStringAsync(this.documentDirectory + filePath, jsonString);
            console.log('Json file saved successfully');
        } catch(e) {
            console.log('Error saving file: ', e);
        }
    }

    async deleteJsonDataFromDisk(filePath: string) {
        try {
            await FileSystem.deleteAsync(this.documentDirectory + filePath);
        } catch(e) {
            console.error("Error deleting file: ", e);
        }
    }

    isFileOneDayOld(fileCreatedAt: number) {
        const today = new Date().getTime();

        const differenceInMS = today - fileCreatedAt;

        return differenceInMS > this.oneDayInMS;
    }
}

export default new CurrencyExchangeService();
