import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {getWeather} from '../api/getWeather';
import {WeatherData} from '../types/weather';
import {WeatherContextType} from '../types/weather-context';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({children}: {children: ReactNode}) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      const data = await getWeather(selectedCity);
      setWeatherData(data);
    };

    fetchWeather();
  }, [selectedCity]);

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
