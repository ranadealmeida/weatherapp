import Config from 'react-native-config';

const API_KEY = Config.API_KEY;
const url = 'https://api.weatherapi.com/v1';

export const getWeather = async (city: string) => {
    try {
        const response = await fetch(`${url}/current.json?key=${API_KEY}&q=${city}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getSevenDaysWeather = async (city: string) => {
    try {
        const response = await fetch(`${url}/forecast.json?key=${API_KEY}&q=${city}&days=7`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        return null;
    }
};