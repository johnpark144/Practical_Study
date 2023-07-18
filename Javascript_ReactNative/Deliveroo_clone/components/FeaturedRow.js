import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity'; // projectId와 연결된 데이터 호출 하게 가능

const FeaturedRow = ({ id, title, description }) => {
  const { titleArrow, featureTitle, featureDescription, featureScroll } =
    styles;

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        // 2번째 인수 id를 $id 부분에 다이나믹하게 적용
        `
            *[_type == "featured" && _id == $id]{
                ...,
                restaurants[]->{
                  ...,
                  dishes[]->,
                  type->{
                    name
                  }
                }
              }[0]
            `,
        { id } // { id:id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <View style={titleArrow}>
        <Text style={featureTitle}>{title}</Text>
        <AntDesign name='arrowright' size={24} color='#00ccbb' />
      </View>
      <Text style={featureDescription}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={featureScroll}
      >
        {/* 레스토랑카드.... */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({
  titleArrow: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  featureDescription: {
    fontSize: 16,
    color: '#8e8e8e',
    paddingHorizontal: 4,
  },
  featureScroll: {
    paddingTop: 6,
  },
});
