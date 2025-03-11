import { WeatherData } from "./weather";

export interface WeatherContextType {
  selectedCity: string | null;
  weatherData: WeatherData | null;
  setSelectedCity: (city: string) => void;
  favoriteCities: string[];
  addFavoriteCity: (city: string) => void;
  removeFavoriteCity: (city: string) => void;
  favoriteCitiesWeather: WeatherData[];
  query: string | null;
  setQuery: (query: string) => void;
  suggestions: any[];
  setSuggestions: (suggestions: any[]) => void;
  loading: boolean;
  handleSearch: (query: string) => void;
  handleCitySelect: (city: string) => void;
}