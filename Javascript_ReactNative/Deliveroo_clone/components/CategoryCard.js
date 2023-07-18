import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CategoryCard = ({ imgUrl, title }) => {
  const { cardButton, cardImage, cardTitle } = styles;
  return (
    <TouchableOpacity style={cardButton}>
      <Image source={{ uri: imgUrl }} style={cardImage} />
      <Text style={cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardButton: {
    position: 'relative',
    marginRight: 6,
  },
  cardImage: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    color: 'white',
    fontWeight: 'bold',
  },
});
