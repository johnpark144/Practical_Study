import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './popularjobcard.style';
import { checkImageURL } from '../../../../utils';

const PopularJobCard = ({ item, selectedJob, setSelectedJob }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => {
        router.push(`/job-details/${item.job_id}`);
        setSelectedJob(item.job_id);
      }}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo) // 정규표현식으로 이미지 파일인지 확인하기
              ? item.employer_logo // 이미지가 있으면 그 이미지 사용, 없으면 기본사진
              : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {/* numberOfLines 으로 몇 줄까지 쓸지 작성하고 초과하면 ... 처리 */}
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedJob, item)}>
            {item?.job_publisher} -
          </Text>
          <Text style={styles.location}> {item.job_country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
