import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const getWeatherIcon = (conditionCode) => {
  switch (conditionCode) {
    case 1000: // Sunny
      return <Icon name="weather-sunny" size={50} color="#FFD700" />;
    case 1003: // Partly cloudy
      return <Icon name="weather-partly-cloudy" size={50} color="#87CEEB" />;
    case 1006: // Cloudy
      return <Icon name="weather-cloudy" size={50} color="#808080" />;
    case 1009: // Overcast
      return <Icon name="weather-cloudy" size={50} color="#A9A9A9" />;
    case 1030: // Mist
      return <Icon name="weather-fog" size={50} color="#D3D3D3" />;
    case 1063: // Patchy rain possible
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1066: // Patchy snow possible
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1069: // Patchy sleet possible
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1072: // Patchy freezing drizzle possible
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1087: // Thundery outbreaks possible
      return <Icon name="weather-lightning" size={50} color="#FF4500" />;
    case 1114: // Blowing snow
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1117: // Blizzard
      return <Icon name="weather-snowy-heavy" size={50} color="#FFFFFF" />;
    case 1135: // Fog
      return <Icon name="weather-fog" size={50} color="#D3D3D3" />;
    case 1147: // Freezing fog
      return <Icon name="weather-fog" size={50} color="#D3D3D3" />;
    case 1150: // Patchy light drizzle
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1153: // Light drizzle
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1168: // Freezing drizzle
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1171: // Heavy freezing drizzle
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1180: // Patchy light rain
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1183: // Light rain
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1186: // Moderate rain at times
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1189: // Moderate rain
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1192: // Heavy rain at times
      return <Icon name="weather-pouring" size={50} color="#00008B" />;
    case 1195: // Heavy rain
      return <Icon name="weather-pouring" size={50} color="#00008B" />;
    case 1198: // Light freezing rain
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1201: // Moderate or heavy freezing rain
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1204: // Light sleet
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1207: // Moderate or heavy sleet
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1210: // Patchy light snow
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1213: // Light snow
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1216: // Patchy moderate snow
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1219: // Moderate snow
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1222: // Patchy heavy snow
      return <Icon name="weather-snowy-heavy" size={50} color="#FFFFFF" />;
    case 1225: // Heavy snow
      return <Icon name="weather-snowy-heavy" size={50} color="#FFFFFF" />;
    case 1237: // Ice pellets
      return <Icon name="weather-hail" size={50} color="#ADD8E6" />;
    case 1240: // Light rain shower
      return <Icon name="weather-rainy" size={50} color="#4682B4" />;
    case 1243: // Moderate or heavy rain shower
      return <Icon name="weather-pouring" size={50} color="#00008B" />;
    case 1246: // Torrential rain shower
      return <Icon name="weather-pouring" size={50} color="#00008B" />;
    case 1249: // Light sleet showers
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1252: // Moderate or heavy sleet showers
      return <Icon name="weather-snowy-rainy" size={50} color="#ADD8E6" />;
    case 1255: // Light snow showers
      return <Icon name="weather-snowy" size={50} color="#FFFFFF" />;
    case 1258: // Moderate or heavy snow showers
      return <Icon name="weather-snowy-heavy" size={50} color="#FFFFFF" />;
    case 1261: // Light showers of ice pellets
      return <Icon name="weather-hail" size={50} color="#ADD8E6" />;
    case 1264: // Moderate or heavy showers of ice pellets
      return <Icon name="weather-hail" size={50} color="#ADD8E6" />;
    case 1273: // Patchy light rain with thunder
      return <Icon name="weather-lightning-rainy" size={50} color="#FF4500" />;
    case 1276: // Moderate or heavy rain with thunder
      return <Icon name="weather-lightning-rainy" size={50} color="#FF4500" />;
    case 1279: // Patchy light snow with thunder
      return <Icon name="weather-lightning" size={50} color="#FF4500" />;
    case 1282: // Moderate or heavy snow with thunder
      return <Icon name="weather-lightning" size={50} color="#FF4500" />;
    default:
      return <Icon name="weather-sunny" size={50} color="#FFD700" />;
  }
};