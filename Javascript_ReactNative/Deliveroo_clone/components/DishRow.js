import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { urlFor } from '../sanity';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
  const {
    dishName,
    dishDescription,
    dishPrice,
    dishImage,
    dishButton,
    nameDesPrice,
    minNumPlusContainer,
    minNumPlus,
    removeBorder,
  } = styles;

  const [isPressed, setIsPressed] = useState(false);

  // 리덕스
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();
  
  // 아이템 추가
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  
  // 아이템 제거
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={isPressed ? [dishButton, removeBorder] : dishButton}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {/* 이름, 설명, 가격 */}
          <View style={nameDesPrice}>
            <Text style={dishName}>{name}</Text>
            <Text style={dishDescription}>{description}</Text>
            <Text style={dishPrice}>{price}$</Text>
          </View>
          {/* 이미지 */}
          <View>
            <Image style={dishImage} source={{ uri: urlFor(image).url() }} />
          </View>
        </View>
      </TouchableOpacity>
      {/* -, 갯수, + */}
      {isPressed && (
        <View style={minNumPlusContainer}>
          <View style={minNumPlus}>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <AntDesign
                name='minuscircle'
                size={40}
                color={items.length > 0 ? '#00CCBB' : 'gray'}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <AntDesign name='pluscircle' size={40} color='#00CCBB' />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({
  dishButton: {
    backgroundColor: 'white',
    padding: 10,
    // border 효과 주기
    borderColor: '#dedede',
    borderWidth: 0.5,
  },
  dishName: {
    fontSize: 18,
    marginBottom: 4,
  },
  dishDescription: {
    color: '#8e8e8e',
  },
  dishPrice: {
    color: '#8e8e8e',
    marginTop: 4,
  },
  dishImage: {
    height: 120,
    width: 120,
    backgroundColor: '#8e8e8e',
    padding: 8,
    borderWidth: 1,
    borderColor: '#F3F3F4',
  },
  nameDesPrice: {
    flex: 1,
    paddingRight: 4,
  },
  minNumPlusContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  minNumPlus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
    paddingBottom: 6,
  },
  removeBorder: {
    borderBottomWidth: 0,
  },
});
