export type CurrentWeather = {
  date: Date;
  temp: number;
  humidity: number;
  apparentTemp: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
};

export type HourlyWeather = {
  dates: Date[];
  temps: Float32Array<ArrayBufferLike> | null;
  weatherCodes: Float32Array<ArrayBufferLike> | null;
};

export type DailyWeather = {
  dates: Date[];
  tempsMax: Float32Array<ArrayBufferLike> | null;
  tempsMin: Float32Array<ArrayBufferLike> | null;
  weatherCodes: Float32Array<ArrayBufferLike> | null;
};

export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};

export type Nowcast = {
  city: string;
  country: string;
  formattedDateWithWeekday: string;
  isoDate: string;
  weatherConditionIconPath: string;
  weatherIconDescription: string;
  currentTemp: number;
};

export type WeatherHighlight = {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
};

export type DailyForecast = {
  isoDateOnly: string;
  shortWeekdayOnly: string;
  weatherConditionIconPath: string;
  weatherIconDescription: string;
  tempHigh: number;
  tempLow: number;
};

export type HourlyForecast = {
  weatherConditionIconPath: string;
  weatherIconDescription: string;
  isoDate: string;
  hour12: string;
  temp: number;
};

export type AdaptedWeatherData = {
  overview: Nowcast;
  highlight: WeatherHighlight;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
};

export type WeatherMeta = { src: string; alt: string };
