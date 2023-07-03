import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const params = useSearchParams(); // id SearchParams 값을 가지고있음
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false); // 디폴트로 새로고침을 안하고잇음

  const onRefresh = useCallback(() => {
    // 스크롤을 내리는 새로그침시 작동
    setRefreshing(true); // 새로고침 화살표 등장
    refetch(); // 커스텀 훅에서 만들어논 refetch
    setRefreshing(false); // 새로고침 화살표 사라짐
  }, []);

  // Tab을 누를때 activeTab의 값이 Tab의 이름으로 바껴서 그에맞게 컴포넌트 출력
  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title='Qualifications'
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        );

      case 'About':
        return (
          <JobAbout info={data[0].job_description ?? 'No data provided'} />
        );

      case 'Responsibilities':
        return (
          <Specifics
            title='Responsibilities'
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: 'lightblue' },
          headerShadowVisible: false, // 헤더 밑 그림자 존재 여부
          headerBackVisible: false, // 디폴트 뒤로가기 버튼 존재 여부
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()} // 뒤로가기 기능을 handlePress라는 props로 전달
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: '',
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false} // 스크롤을 보여줄지 여부
          refreshControl={
            // refreshing=true는 스크롤을 내릴때 시계모양 화살표나오게함, onRefresh는 스크롤을 내릴때 함수 실행
            // 즉, 스크롤 내릴때 새로고침 하기위한 기능
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            'https://careers.google.com/jobs/results/'
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
