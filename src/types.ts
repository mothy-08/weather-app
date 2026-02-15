export type CurrentWeather = {
  date: Date;
  weatherCode: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
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

export type IconMeta = { src: string; alt: string };

export type Nowcast = {
  city: string;
  country: string;
  weekdayWithDate: string;
  date: string;
  temp: number;
  icon: IconMeta;
};

export type WeatherHighlight = {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
};

export type DailyForecast = {
  date: string;
  weekdayShort: string;
  icon: IconMeta;
  tempHigh: number;
  tempLow: number;
};

export type HourlyForecast = {
  date: string;
  hour12: string;
  temp: number;
  icon: IconMeta;
};

export type AdaptedWeatherData = {
  overview: Nowcast;
  highlight: WeatherHighlight;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
};
