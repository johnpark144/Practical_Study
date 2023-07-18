import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign, EvilIcons, Entypo } from '@expo/vector-icons';
import { urlFor } from '../sanity'; // 이미지url 생성용
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const {
    card,
    cardImage,
    featuredInfo,
    featuredTitle,
    starRateGenre,
    rateGenre,
    rate,
    locationAddress,
    nearbyDotAddress,
  } = styles;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          // useNavigation의 navigation기능, 2번째 인수로 props전달
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={card}
    >
      {/* 이미지 */}
      <Image
        source={{
          uri: urlFor(imgUrl).url(), // Sanity에서 Fetch해온 이미지를 Url로 전환하여 사용
        }}
        style={cardImage}
      />
      <View style={featuredInfo}>
        {/* 이름, 점수, 종류 */}
        <Text style={featuredTitle}>{title}</Text>
        <View style={starRateGenre}>
          <AntDesign name='star' size={22} color='#037906' />
          <Text style={rateGenre}>
            <Text style={rate}>{rating}</Text>{' '}
            <Entypo name='dot-single' size={12} color='gray' /> {genre}
          </Text>
        </View>
        {/* 위치아이콘, Nearby, 주소 */}
        <View style={locationAddress}>
          <EvilIcons name='location' size={22} color='gray' />
          <Text style={nearbyDotAddress}>
            Nearby <Entypo name='dot-single' size={12} color='gray' /> {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginRight: 3,
    elevation: 4, // 그림자 강도
    shadowColor: 'black', // 그림자 색
  },
  cardImage: {
    height: 140,
    width: 240,
  },
  featuredInfo: {
    paddingHorizontal: 12,
    paddingBottom: 14,
  },
  featuredTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 10,
  },
  starRateGenre: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 4,
  },
  rateGenre: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  rate: {
    color: '#037906',
  },
  locationAddress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyDotAddress: {
    fontSize: 14,
    color: '#8e8e8e',
  },
});
