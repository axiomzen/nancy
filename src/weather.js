const moment = require('moment');
const DarkSkyApi = require('dark-sky-api');

if (!process.env.DARK_SKY_TOKEN) {
  throw new Error('DARK_SKY_TOKEN environment variable is reqiured.');
}

const api = new DarkSkyApi(process.env.DARK_SKY_TOKEN, true, 'si', 'en');

const vancouver = {
  latitude: 49.246292,
  longitude: -123.116226
};

const icons = {
  'clear-day': 'sunny',
  'clear-night': 'crescent_moon',
  rain: 'umbrella_with_rain_drops',
  snow: 'snowflake',
  sleet: 'umbrella_with_rain_drops',
  wind: 'wind_blowing_face',
  fog: 'fog',
  cloudy: 'cloud',
  'partly-cloudy-day': 'sun_behind_cloud',
  'partly-cloudy-night': 'sun_behind_cloud',
  hail: 'snowflake',
  thunderstorm: 'thunder_cloud_and_rain',
  tornado: 'tornado_cloud'
};

const formatWeather = data => {
  const currently = data.currently;
  const emoji = icons[currently.icon];
  return `${currently.dateTime.format(
    'MMMM Do'
  )} :${emoji}: ${currently.summary} ${currently.temperature}°C`;
};

module.exports.weatherForTime = async time => {
  const data = await api.position(vancouver).loadTime(moment(time));
  return formatWeather(data);
};
