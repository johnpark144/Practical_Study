
// ######### 리마인더 #######################################################################################################################################




// ######### 인덱스 (Ctrl + F) ########################################################### (-> 인덱스에 있는데 찾기 안되면 찾아서 인덱스 변경) ##################

// ######## 기본 참고 사이트 ############################################################################################################################
//  https://reactnative.dev/docs/intro-react-native-components  // 리액트 네이티브 핵심 컴포넌트
// https://icons.expo.fyi     // 아이콘 사이트



// ######## Expo 기본 세팅 ############################################################################################################################
// npm i -g expo-cli   // Expo를 사용 가능하게
// npx create-expo-app@latest -e with-router  // Expo로 리액트 네이티브 앱 만들기


// ################################################################################################## eslint, prettier ############################
// https://bobbyhadz.com/blog/replace-double-quotes-with-single-in-vscode    // eslint, prettier 오류 시 참고

// ############## eslint 설정
// npm i eslint --save-dev  // eslint 다운
// npx eslint --init  // eslint 초기설정
// npm i @react-native-community/eslint-config --save-dev

// ############## .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'off',
      },
    ],
    semi: ['error', 'never'],
    'comma-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ],
  },
};


// ############## prettier 설정
// npm i --save-dev --save-exact prettier  // prettier 다운
// .prettierrc.js 파일 생성
// package.json 안에 scripts에 "lint": "eslint ." 입력  // cli로 전체 문법 검사

// ############## .prettierrc (나중에 변경)
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all"
}

// ######## 기본 컴포넌트 ##################################################################################################################################
import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native"; \
// View = Div, Text = P, 
// SafeAreaView 는 탐색 표시줄, 탭 표시줄, 툴바, 기타 상위 뷰에서 다루지 않는 뷰 부분을 반영하도록 패딩을 자동 적용시켜줌
// StyleSheet는 Css효과를 줄 수있는 객체

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text>Current Weather</Text>
        <Text style={styles.temp}>6</Text>
        <Text style={styles.feels}>Feels like 5</Text>
        <Text>High: 8 Low: 6</Text>
      </View>
    </SafeAreaView>
  );
};

// 스타일
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    backgroundColor: "lightgray",
    flex: 1,
  },
  container: {
    backgroundColor: "pink",
    flex: 1,
    alignItems: "center",
  },
  temp: {
    color: "black",
    fontSize: 48,
  },
  feels: {
    color: "black",
    fontSize: 30,
  },
});

export default App;

// ######## 아이콘 ############################################################################################################################
// https://icons.expo.fyi     // 아이콘 검색하여 사용하게 함

import { Feather } from "@expo/vector-icons";
<Feather name="sun" size={100} color="black" />

// ######## FlatList (리액트에서 Map으로 리스트 구현하는 것과 비슷) ###############################################################################
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// 배열식으로 된 데이터 (데이터를 펼치기 위해)
const DATA = [
  {
    dt_txt: '2022-08-30 16:00:00',
    main: {
      temp_min: 8.55,
      temp_max: 7.55,
    },
    weather: [
      {
        main: 'Clear',
      },
    ],
  },
  {
    dt_txt: '2022-08-30 18:00:00',
    main: {
      temp_min: 8.55,
      temp_max: 7.55,
    },
    weather: [
      {
        main: 'Clouds',
      },
    ],
  },
  {
    dt_txt: '2022-08-30 20:00:00',
    main: {
      temp_min: 8.55,
      temp_max: 7.55,
    },
    weather: [
      {
        main: 'Rain',
      },
    ],
  },
];

// 렌더 방식 컴포넌트
const Item = ({ dt_txt, min, max, condition }) => {
  return (
    <View style={styles.item}>
      <Feather name={'sun'} size={50} color={'white'} />
      <Text style={styles.date}>{dt_txt}</Text>
      <Text style={styles.temp}>{min}</Text>
      <Text style={styles.temp}>{max}</Text>
    </View>
  );
};

function UpcomingWeather() {
  // 렌더 방식
  const renderItem = ({ item }) => (
    <Item
      condition={item.weather[0].main}
      dt_txt={item.dt_txt}
      min={item.main.temp_min}
      max={item.main.temp_max}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Upcoming Weather</Text>
      <FlatList
        data={DATA} // 배열식으로 된 데이터
        renderItem={renderItem} // 렌더 방식
        keyExtractor={(item) => item.dt_txt} // Key 값
      />
    </SafeAreaView>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0, // 상태바 크기만큼 마진 주기
    backgroundColor: 'red',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 5,
    backgroundColor: 'pink',
  },
  temp: {
    color: 'white',
    fontSize: 20,
  },
  date: {
    color: 'white',
    fontSize: 15,
  },
});

export default UpcomingWeather;
// ######## Image, ImageBackground, 배열 스타일 ############################################################################################################################
import { Image, ImageBackground } from 'react-native';

function City() {
  const { cityName, countryName, cityText } = styles;
  return (
       // 이미지
      <Image
        source={require('../../assets/upcoming-background.jpg')}  // 이미지 위치
        style={styles.image}  // 스타일
      />
       // 이미지 배경
      <ImageBackground  // 배경은 셀프 클로징이 아닌 배경을 줄 컴포넌트들을 감쌈
        source={require('../../assets/upcoming-background.jpg')}
        style={styles.image}
      >
          // 스타일을 배열로 주기
        <Text style={[cityName, cityText]}>London</Text>
        <Text style={[countryName, cityText]}>UK</Text>
      </ImageBackground>
  );

const styles = StyleSheet.create({
  cityName: {
    fontSize: 40,
  },
  countryName: {
    fontSize: 30,
  },
  cityText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
// ######## 네비게이션 (React Navigation 위주) ############################################################################################################################
// 리액트 네이티브에서 가장 많이 사용되는 두 라이브러리
// React Navigation : 빠르게 시작하고 상대적으로 간단한 응용 프로그램을 개발
// React Native Navigation :  성능이 중요한 프로젝트

// https://reactnavigation.org/docs/getting-started  // React Navigation 사이트
// https://github.com/react-navigation/react-navigation  // React Navigation 깃허브

// 필수 다운
// npm i @react-navigation/native      // React Navigation 다운
// npx expo install react-native-screens react-native-safe-area-context      // react-native-screens는 앱의 화면 전환과 탐색을 최적화 // react-native-safe-area-context는 앱이 안전 영역 안에서 표시되도록

// 종류에 따라 다르게 다운
// npm i @react-navigation/bottom-tabs  // 버튼 탭 종류로 사용하기

// ################ App.js
import React from 'react';
import CurrentWeather from './src/screens/CurrentWeather';
import UpcomingWeather from './src/screens/UpcomingWeather';
import City from './src/screens/City';
import { NavigationContainer } from '@react-navigation/native'; // 전체 네비게이션을 감싸줌
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Navigator, Screen 컴포넌트
import { Feather } from '@expo/vector-icons';

// Navigator는 네비게이션 정의할 부분을 감싸줌, Screen은 어디로 네비게이션 할지
// 리액트라우터와 비교 : NavigationContainer = BrowserRouter // Navigator = Routes // Screen = Route
const { Navigator, Screen } = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato', // 네비게이션되 있을때 색깔
        tabBarInactiveTintColor: 'grey', // 그 외에 기존 색깔
        tabBarStyle: {  // 네비바에 스타일
          backgroundColor: 'lightblue',
        },
      }}
    >
        <Screen
          name={'Current'}
          component={CurrentWeather} // 네비게이션할 컴포넌트
          options={{
            tabBarIcon: (
              { focused } // 네비바 아이콘 지정, 함수 파라미터안에 active되있는지 안되있는지 "focused"라는 불린 값 존재
            ) => (
              <Feather
                name={'droplet'}
                size={25}
                color={focused ? 'tomato' : 'black'} // active되있을떄 tomato색 아이콘으로
              />
            ),
          }}
        />
        <Screen
          name={'Upcoming'}
          component={UpcomingWeather}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={'clock'}
                size={25}
                color={focused ? 'tomato' : 'black'}
              />
            ),
          }}
        />
        <Screen
          name={'City'}
          component={City}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={'home'}
                size={25}
                color={focused ? 'tomato' : 'black'}
              />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;


// @@@@@@@@@@@ Weather App @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ######## ############################################################################################################################
