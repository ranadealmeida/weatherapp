import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import Config from 'react-native-config';
import { getWeather, getSevenDaysWeather } from '../api/getWeather';
import { WeatherData } from '../types/weather';
import { WeatherContextType } from '../types/weather-context';
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
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const cities = await getCitySuggestions(text, Config.API_KEY);
      setSuggestions(cities);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
    setLoading(false);
  };

  const handleCitySelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    setSelectedCity(city);
  };

  const fetchWeather = async () => {
    if (!selectedCity) return;
    try {
      const data = await getSevenDaysWeather(selectedCity);
      setWeatherData(data);
      console.log("Fetching weather data...");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather(); // Initial fetch
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedCity) return;

    const interval = setInterval(fetchWeather, 900000);

    return () => clearInterval(interval);
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
        query,
        setQuery,
        suggestions,
        setSuggestions,
        loading,
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
