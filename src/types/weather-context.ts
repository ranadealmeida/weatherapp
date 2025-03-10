import { WeatherData } from "./weather";

export interface WeatherContextType {
  selectedCity: string | null;
  weatherData: WeatherData | null;
  setSelectedCity: (city: string) => void;
    favoriteCities: string[];
    addFavoriteCity: (city: string) => void;
    removeFavoriteCity: (city: string) => void;
    toggleFavoriteCity: (city: string) => void;
}