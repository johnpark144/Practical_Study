import { useState } from 'react';
import {
  View,
  Text,
  TextInput, // 텍스트 작성 하도록
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const jobTypes = ['Full-time', 'Part-time', 'Contractor'];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            // onChange대신 onChangeText이고, 첫 매개변수가 일반 event 대신 웹의 event.target.value와 같이 전달
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search} // 이미지 src
            resizeMode='contain'
            // cover(디폴트) : 비율유지하되 View와비율 일치 않으면 일부분 잘림
            // contain : 비율유지하되 모든 영역이 View안에 보이도록
            // stretch : View의 크기대로 리사이징하여 비율이 잘라질수있음
            // repeat : 바둑판식
            // center : 중앙에
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList // map같이 반복 출력 (ScrollView와 마찬가지로 자동으로 스크롤 가능하게 함)
          data={jobTypes}
          renderItem={(
            { item } // item에 data 안에 배열들의 값이 하나하나 전달됨
          ) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`); // 화면 이동시킴 (Nextjs와 비슷)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }} // ScrollView와 FlatList의 스타일이라 보면됨
          horizontal // 수평으로 정렬
        />
      </View>
    </View>
  );
};

export default Welcome;
