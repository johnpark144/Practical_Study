import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { AntDesign, Entypo, EvilIcons } from '@expo/vector-icons';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { setRestaurant } from '../features/restaurantSlice';
import { useDispatch } from 'react-redux';

const RestaurantScreen = () => {
  const {
    detailImage,
    goBackArrowButton,
    detailTitle,
    locationAddress,
    nearbyDotAddress,
    rateGenre,
    starRateGenre,
    detailSubInfo,
    detailDescription,
    HaveAllergy,
    questionAllergyArrow,
    menu,
  } = styles;

  const {
    params: {
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
    },
  } = useRoute(); // navigate되며 전달된 props를 params로받음

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        {/* 이미지랑 뒤로가기 버튼 */}
        <View>
          <Image source={{ uri: urlFor(imgUrl).url() }} style={detailImage} />
          <TouchableOpacity
            style={goBackArrowButton}
            onPress={navigation.goBack}
          >
            <AntDesign name='arrowleft' size={20} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: '#eeeeee' }}>
          <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            {/* 식당 이름 */}
            <Text style={detailTitle}>{title}</Text>
            <View style={detailSubInfo}>
              {/* 별, 점수, 종류 */}
              <View style={starRateGenre}>
                <AntDesign
                  name='star'
                  size={22}
                  color='green'
                  style={{ opacity: 0.5 }}
                />
                <Text style={rateGenre}>
                  <Text>{rating}</Text>
                  <Entypo name='dot-single' size={12} color='gray' />
                  {genre}
                </Text>
              </View>
              {/* 위치아이콘, Nearby, 주소 */}
              <View style={locationAddress}>
                <EvilIcons
                  name='location'
                  size={22}
                  color='gray'
                  style={{ opacity: 0.5 }}
                />
                <Text style={nearbyDotAddress}>
                  Nearby
                  <Entypo name='dot-single' size={12} color='gray' />
                  {address}
                </Text>
              </View>
            </View>
            {/* 설명 */}
            <Text style={detailDescription}>{short_description}</Text>
          </View>
          {/* 물음표, Have allergy, 오른쪽 화살표 */}
          <TouchableOpacity style={questionAllergyArrow}>
            <AntDesign
              name='questioncircleo'
              size={20}
              color='gray'
              style={{ opacity: 0.5 }}
            />
            <Text style={HaveAllergy}>Have a food allergy?</Text>
            <Entypo name='chevron-right' size={24} color='#00CCBB' />
          </TouchableOpacity>
        </View>
        {/* 메뉴 */}
        <View style={{ paddingBottom: 140 }}>
          <Text style={menu}>Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  detailImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#8e8e8e',
  },
  goBackArrowButton: {
    position: 'absolute',
    top: 40,
    left: 25,
    padding: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 100,
  },
  detailTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  locationAddress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  nearbyDotAddress: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  rateGenre: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  starRateGenre: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  detailSubInfo: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 4,
    marginVertical: 2,
  },
  detailDescription: {
    color: '#8e8e8e',
    marginTop: 4,
    paddingBottom: 8,
  },
  HaveAllergy: {
    paddingLeft: 4,
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionAllergyArrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    padding: 12,
    borderColor: '#dedede',
    borderWidth: 1,
  },
  menu: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
