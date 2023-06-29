import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // 전체 네비게이션을 감싸줌
import Tabs from './src/components/Tabs';
import { useGetWeather } from './src/hooks/useGetWeather';
import ErrorItem from './src/components/ErrorItem';
import OurButton from './src/demonstration/OurButton';

const App = () => {
  const { container } = styles;
  const [loading, error, weather] = useGetWeather(); // 현재 위치를 가져오고, 그위치의 날씨정보 가져오는 커스텀훅

  if (weather && weather.list && !loading) {
    return (
      // 날씨정보를 네비게이션에 전달
      <NavigationContainer>
        <Tabs weather={weather} />
      </NavigationContainer>
    );
  }

  return (
    <View style={container}>
      {error ? (
        <ErrorItem />
      ) : (
        <ActivityIndicator size={'large'} color={'blue'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default App;
