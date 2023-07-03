import { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from '../components';

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: 'lightblue' }, // 헤더 스타일
          headerShadowVisible: false, // 헤더와 컨텐츠 구분하는 선 보여줄지 여부
          headerLeft: () => (
            // 헤더에 왼쪽부븐에 들어갈 내용
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            // 헤더에 오른쪽부븐에 들어갈 내용
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: '', // 헤더 가운데 들어갈 말
        }}
      />

      {/* ScrollView는 스크롤 하는 View, showsVerticalScrollIndicator는 세로 스크롤 보일지 여부 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />

          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
