import React from "react";
import { View, Text } from "react-native";
import { WeatherData } from "../types/weather";

interface WeatherCardProps {
  data: WeatherData; 
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) {
    return <Text>Loading weather...</Text>; 
  }

  return (
    <View>
      <Text>{`${data.location.name}, ${data.location.country}`}</Text>
      <Text>{`${data.current.temp_c}°C`}</Text>
      <Text>{data.current.condition.text}</Text>
    </View>
  );
};


export default WeatherCard;