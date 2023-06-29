import React from 'react';
import CurrentWeather from '../screens/CurrentWeather';
import UpcomingWeather from '../screens/UpcomingWeather';
import City from '../screens/City';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// Navigator는 네비게이션 정의할 부분을 감싸줌, Screen은 어디로 네비게이션 할지
// 리액트라우터와 비교 : NavigationContainer = BrowserRouter // Navigator = Routes // Screen = Route
const { Navigator, Screen } = createBottomTabNavigator();

function Tabs({ weather }) {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato', // 네비게이션되 있을때 색깔
        tabBarInactiveTintColor: 'grey', // 그 외에 기존 색깔
        // 버튼 누르는 부분 스타일
        tabBarStyle: {
          backgroundColor: 'lightblue',
        },
        // 헤더의 배경색, 테두리, 그림자 등 헤더의 뒷 배경과 관련된 속성을 지정
        headerStyle: {
          backgroundColor: 'lightblue',
        },
        // 헤더의 제목의 글꼴, 크기, 색상, 줄 간격 등과 관련된 스타일 속성을 지정
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          color: 'tomato',
        },
      }}
    >
      <Screen
        name={'Current'}
        options={{
          tabBarIcon: (
            { focused } // 네비바 아이콘 지정, 함수 파라미터안에 active되있는지 안되있는지 "focused"라는 불린 값 존재
          ) => (
            <Feather
              name={'droplet'}
              size={25}
              color={focused ? 'tomato' : 'black'} // active되있으면 tomato색 아이콘으로
            />
          ),
        }}
      >
        {/* 네비게이션탭들에 props를 넘겨주고 싶을떄 component props대신에 사용 */}
        {() => <CurrentWeather weatherData={weather.list[0]} />}
      </Screen>
      <Screen
        name={'Upcoming'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'clock'}
              size={25}
              color={focused ? 'tomato' : 'black'}
            />
          ),
        }}
      >
        {() => <UpcomingWeather weatherData={weather.list} />}
      </Screen>
      <Screen
        name={'City'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'home'}
              size={25}
              color={focused ? 'tomato' : 'black'}
            />
          ),
        }}
      >
        {() => <City weatherData={weather.city} />}
      </Screen>
    </Navigator>
  );
}

export default Tabs;
