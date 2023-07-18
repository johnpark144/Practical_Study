import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'; // projectId와 연결된 데이터 호출 하게 가능
import category from '../sanity/schemas/category';

const HomeScreen = () => {
  const {
    safeAreaView,
    motorcycleImage,
    header,
    headerMessage,
    deliver,
    current,
    search,
    searchFilter,
    body,
  } = styles;
  const navigation = useNavigation(); //
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        // GraphQL 쿼리에 맞춰서 Fetch함
        `
        *[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->
            }
          }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={safeAreaView}>
      {/* 헤더 */}
      <View style={header}>
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          style={motorcycleImage}
        />
        <View style={headerMessage}>
          <Text style={deliver}>Deliver Now!</Text>
          <Text style={current}>
            Current Location
            <Entypo name='chevron-small-down' size={25} color='#00ccbb' />
          </Text>
        </View>
        <Feather name='user' size={35} color='#00ccbb' />
      </View>
      {/* 검색 */}
      <View style={searchFilter}>
        <View style={search}>
          <AntDesign name='search1' size={24} color='#9f9f9f' />
          <TextInput
            placeholder='Restrants and cuisines'
            keyboardType='default'
          />
        </View>

        <Feather name='sliders' size={24} color='#00ccbb' />
      </View>
      {/* Body */}
      <ScrollView style={body}>
        {/* 카테고리 */}
        <Categories />
        {/* 대표음식 */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#efefef',
    paddingTop: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    gap: 10,
  },
  motorcycleImage: {
    height: 30,
    width: 30,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 50,
  },
  headerMessage: {
    flex: 1,
  },
  deliver: {
    fontWeight: 'bold',
    color: '#a2a2a2',
  },
  current: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#e0e0e0',
    padding: 10,
    flex: 1,
  },
  searchFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
    marginHorizontal: 16,
  },
  body: {
    backgroundColor: '#efefef',
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
