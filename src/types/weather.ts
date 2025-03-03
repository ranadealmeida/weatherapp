export interface WeatherData {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number; 
      condition: {
        text: string;
      };
    };
  }
  