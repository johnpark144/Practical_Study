import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

const BasketIcon = () => {
  const { basketContainer, totalPrice, basketBtn, itemNumber, viewBasket } =
    styles;

  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View style={basketContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        style={basketBtn}
      >
        <Text style={itemNumber}>{items.length}</Text>
        <Text style={viewBasket}>View Basket</Text>
        <Text style={totalPrice}>${basketTotal}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({
  basketContainer: {
    position: 'absolute',
    bottom: 18,
    width: '100%',
    zIndex: 5,
  },
  totalPrice: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
  },
  basketBtn: {
    marginHorizontal: 10,
    backgroundColor: '#00CCBB',
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  itemNumber: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
    backgroundColor: '#01A296',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  viewBasket: {
    flex: 1,
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
  },
});
