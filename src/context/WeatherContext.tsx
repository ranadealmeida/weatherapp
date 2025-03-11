import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {getWeather, getSevenDaysWeather} from '../api/getWeather';
import {WeatherData} from '../types/weather';
import {WeatherContextType} from '../types/weather-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({children}: {children: ReactNode}) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [favoriteCitiesWeather, setFavoriteCitiesWeather] = useState<WeatherData[]>([]);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      const data = await getSevenDaysWeather(selectedCity);
      setWeatherData(data);
    };

    fetchWeather();
  }, [selectedCity]);

  useEffect(() => {
    const loadLastSearchedCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem('lastSearchedCity');
        if (storedCity) {
          setSelectedCity(storedCity);
        }
      } catch (error) {
        console.error('Failed to load last searched city:', error);
      }
    };

    loadLastSearchedCity();
  }, []);

  useEffect(() => {
    const saveLastSearchedCity = async () => {
      try {
        if (selectedCity) {
          await AsyncStorage.setItem('lastSearchedCity', selectedCity);
        }
      } catch (error) {
        console.error('Failed to save last searched city:', error);
      }
    };

    saveLastSearchedCity();
  }, [selectedCity]);

  useEffect(() => {
    const loadFavoriteCities = async () => {
      try {
        const storedFavoriteCities = await AsyncStorage.getItem(
          'favoriteCities',
        );
        if (storedFavoriteCities) {
          setFavoriteCities(JSON.parse(storedFavoriteCities));
        }
      } catch (error) {
        console.error('Failed to load favorite cities:', error);
      }
    };

    loadFavoriteCities();
  }, []);

  useEffect(() => {
    const saveFavoriteCities = async () => {
      try {
        await AsyncStorage.setItem(
          'favoriteCities',
          JSON.stringify(favoriteCities),
        );
      } catch (error) {
        console.error('Failed to save favorite cities:', error);
      }
    };

    saveFavoriteCities();
  }, [favoriteCities]);

  useEffect(() => {
    const fetchFavoriteCitiesWeather = async () => {
      const data = await Promise.all(favoriteCities.map(city => getWeather(city)));
      setFavoriteCitiesWeather(data);
    };

    fetchFavoriteCitiesWeather();
  }, [favoriteCities]);

  const addFavoriteCity = (city: string) => {
    setFavoriteCities([...favoriteCities, city]);
  };

  const removeFavoriteCity = (city: string) => {
    setFavoriteCities(favoriteCities.filter(favCity => favCity !== city));
  };
  

  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        weatherData,
        setSelectedCity,
        favoriteCities,
        favoriteCitiesWeather,
        addFavoriteCity,
        removeFavoriteCity,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
