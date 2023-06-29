import { useState, useEffect } from 'react';
import * as Location from 'expo-location'; // 위치 정보에 관한 라이브러리
import { WEATHER_API_KEY } from 'react-native-dotenv';

export const useGetWeather = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  // 위도, 경도를 이용하여 날씨정보 찾기
  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric` // 날씨정보 API
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError('could not fetch weather');
    } finally {
      setLoading(false);
    }
  };

  // 경도, 위도 저장하기
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // 위치정보 가져와도 되는지 요청

      // 위치정보 요청에 거절한경우
      if (status !== 'granted') {
        setError('permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); // 현재 위치 정보를 가져옴
      setLat(location.coords.latitude);
      setLon(location.coords.longitude);
      await fetchWeatherData();
    })();
  }, [lat, lon]);

  return [loading, error, weather];
};
