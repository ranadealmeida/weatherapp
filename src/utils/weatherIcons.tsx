import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface WeatherIconConfig {
  conditionCode: number;
  iconName: string;
  color: string;
}

const weatherIcons: WeatherIconConfig[] = [
  { conditionCode: 1000, iconName: 'weather-sunny', color: '#FFD700' },
  { conditionCode: 1003, iconName: 'weather-partly-cloudy', color: '#87CEEB' },
  { conditionCode: 1006, iconName: 'weather-cloudy', color: '#808080' },
  { conditionCode: 1009, iconName: 'weather-cloudy', color: '#A9A9A9' },
  { conditionCode: 1030, iconName: 'weather-fog', color: '#D3D3D3' },
  { conditionCode: 1063, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1066, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1069, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1072, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1087, iconName: 'weather-lightning', color: '#FF4500' },
  { conditionCode: 1114, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1117, iconName: 'weather-snowy-heavy', color: '#FFFFFF' },
  { conditionCode: 1135, iconName: 'weather-fog', color: '#D3D3D3' },
  { conditionCode: 1147, iconName: 'weather-fog', color: '#D3D3D3' },
  { conditionCode: 1150, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1153, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1168, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1171, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1180, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1183, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1186, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1189, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1192, iconName: 'weather-pouring', color: '#00008B' },
  { conditionCode: 1195, iconName: 'weather-pouring', color: '#00008B' },
  { conditionCode: 1198, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1201, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1204, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1207, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1210, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1213, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1216, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1219, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1222, iconName: 'weather-snowy-heavy', color: '#FFFFFF' },
  { conditionCode: 1225, iconName: 'weather-snowy-heavy', color: '#FFFFFF' },
  { conditionCode: 1237, iconName: 'weather-hail', color: '#ADD8E6' },
  { conditionCode: 1240, iconName: 'weather-rainy', color: '#4682B4' },
  { conditionCode: 1243, iconName: 'weather-pouring', color: '#00008B' },
  { conditionCode: 1246, iconName: 'weather-pouring', color: '#00008B' },
  { conditionCode: 1249, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1252, iconName: 'weather-snowy-rainy', color: '#ADD8E6' },
  { conditionCode: 1255, iconName: 'weather-snowy', color: '#FFFFFF' },
  { conditionCode: 1258, iconName: 'weather-snowy-heavy', color: '#FFFFFF' },
  { conditionCode: 1261, iconName: 'weather-hail', color: '#ADD8E6' },
  { conditionCode: 1264, iconName: 'weather-hail', color: '#ADD8E6' },
  { conditionCode: 1273, iconName: 'weather-lightning-rainy', color: '#FF4500' },
  { conditionCode: 1276, iconName: 'weather-lightning-rainy', color: '#FF4500' },
  { conditionCode: 1279, iconName: 'weather-lightning', color: '#FF4500' },
  { conditionCode: 1282, iconName: 'weather-lightning', color: '#FF4500' },
];

export const getWeatherIcon = (conditionCode: number, size: number): JSX.Element => {
  const iconConfig = weatherIcons.find(icon => icon.conditionCode === conditionCode);

  if (iconConfig) {
    return <Icon name={iconConfig.iconName} size={size} color={iconConfig.color} />;
  }

  return <Icon name="weather-cloudy-clock" size={size} color="#FFD700" />;
};