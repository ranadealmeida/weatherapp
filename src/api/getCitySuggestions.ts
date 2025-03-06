// src/services/cityService.ts

const API_URL = 'https://api.weatherapi.com/v1/search.json';

export const getCitySuggestions = async (text: string, apiKey: string) => {
  if (text.length < 3) {
    return [];
  }

  try {
    const response = await fetch(`${API_URL}?key=${apiKey}&q=${text}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    throw error;
  }
};