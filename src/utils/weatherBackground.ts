export const getWeatherBackground = (conditionCode: any) => {
    switch (conditionCode) {
      case 1000: 
        return require('../assets/sunny.jpg');
      case 1003: 
        return require('../assets/partly-cloudy.jpg');
      case 1006:
        return require('../assets/cloudy.jpg');
      case 1009: 
        return require('../assets/cloudy.jpg');
      case 1030:
        return require('../assets/misty.jpg');
      case 1066: 
        return require('../assets/snow.jpg');
      case 1087:
        return require('../assets/thunder.jpg');
      default:
        return require('../assets/default-background.jpg');
    }
  };