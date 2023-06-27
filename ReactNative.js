
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

// ############## .eslintrc.js (나중에 변경)
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': [2, 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false }
    ]
  }
}

// ############## prettier 설정
// npm i --save-dev --save-exact prettier  // prettier 다운
// .prettierrc.js 파일 생성
// package.json 안에 scripts에 "lint": "eslint ." 입력  // cli로 전체 문법 검사

// ############## .prettierrc.js (나중에 변경)
module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  semi: false
};

// ######## 기본 컴포넌트 설명 ############################################################################################################################
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

// ######## 아이콘 ############################################################################################################################
          
// @@@@@@@@@@@ Weather App @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ######## ############################################################################################################################
