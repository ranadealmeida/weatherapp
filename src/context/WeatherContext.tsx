import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import Config from 'react-native-config';
import { getWeather, getSevenDaysWeather } from '../api/getWeather';
import { WeatherData, WeatherContextType } from '../types/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCitySuggestions } from '../api/getCitySuggestions';
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [favoriteCitiesWeather, setFavoriteCitiesWeather] = useState<WeatherData[]>([]);
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const cities = await getCitySuggestions(text, Config.API_KEY);
      setSuggestions(cities);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
    setLoadingSuggestions(false);
  };

  const handleCitySelect = (city: string) => {
    setSuggestions([]);
    setSelectedCity(city);
    setQuery('');
  };

  const fetchWeather = async () => {
    if (!selectedCity) return;
    setLoadingWeather(true);
    try {
      const data = await getSevenDaysWeather(selectedCity);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoadingWeather(false);
  };

  const saveLastSearchedCity = async () => {
    try {
      if (selectedCity) {
        await AsyncStorage.setItem('lastSearchedCity', selectedCity);
      }
    } catch (error) {
      console.error('Failed to save last searched city:', error);
    }
  };

  const fetchFavoriteCitiesWeather = async () => {
    setLoadingFavorites(true);
    try {
      const data = await Promise.all(favoriteCities.map(city => getWeather(city)));
    setFavoriteCitiesWeather(data);
    } catch (error) {
      console.error('Error fetching favorite cities weather:', error);
    }
    setLoadingFavorites(false);
  };

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

  const addFavoriteCity = (city: string) => {
    setFavoriteCities([...favoriteCities, city]);
  };

  const removeFavoriteCity = (city: string) => {
    setFavoriteCities(favoriteCities.filter(favCity => favCity !== city));
  };

  useEffect(() => {
    loadLastSearchedCity();
    loadFavoriteCities();
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    fetchWeather();
    saveLastSearchedCity();
    const interval = setInterval(fetchWeather, 900000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  useEffect(() => {
    fetchFavoriteCitiesWeather();
    saveFavoriteCities();
  }, [favoriteCities]);

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
        query,
        setQuery,
        suggestions,
        setSuggestions,
        loadingSuggestions,
        loadingWeather,
        loadingFavorites,
        handleSearch,
        handleCitySelect,
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
