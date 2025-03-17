export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number; 
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          code: number; 
        };
      };
    }[];
  };
};


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
  loadingSuggestions: boolean;
  loadingWeather: boolean;
  loadingFavorites: boolean;
  handleSearch: (query: string) => void;
  handleCitySelect: (city: string) => void;
}