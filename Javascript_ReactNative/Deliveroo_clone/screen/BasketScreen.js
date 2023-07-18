import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { selectsetRestaurant } from '../features/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { urlFor } from '../sanity';

const BasketScreen = () => {
  const {
    basket,
    restaurantTitle,
    closeBtn,
    basketTitleClose,
    basketImage,
    imageDeliverChange,
    menuImage,
    remove,
    menuSection,
    menuContainer,
    totalFeePlaceOrder,
    totalSection,
    placeOrderBtn,
    placeOrder,
  } = styles;
  const navigation = useNavigation();
  const restaurant = useSelector(selectsetRestaurant); // 현재 레스토랑 정보
  const items = useSelector(selectBasketItems); // 주문할 메뉴들
  const basketTotal = useSelector(selectBasketTotal); // 주문할 메뉴들 가격 합계
  const dispatch = useDispatch();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
        {/* Basket, 식당, X버튼 */}
        <View style={basketTitleClose}>
          <View>
            <Text style={basket}>Basket</Text>
            <Text style={restaurantTitle}>{restaurant.title}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} style={closeBtn}>
            <AntDesign name='closecircle' size={40} color='#00CCBB' />
          </TouchableOpacity>
        </View>

        {/* 오토바이 이미지, 걸리는 시간, Change */}
        <View style={imageDeliverChange}>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            style={basketImage}
          />
          <Text style={{ flex: 1 }}>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text style={{ color: '#00CCBB' }}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* 주문할 메뉴들 */}
        <ScrollView style={menuContainer}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} style={menuSection}>
              <Text style={{ color: '#00CCBB' }}>{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={menuImage}
              />
              <Text style={{ flex: 1 }}>{items[0]?.name}</Text>
              <Text style={{ color: '#8e8e8e' }}>{items[0].price}$</Text>
              <TouchableOpacity>
                <Text
                  style={remove}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={totalFeePlaceOrder}>
          {/* Subtotal */}
          <View style={totalSection}>
            <Text style={{ color: '#8e8e8e' }}>Subtotal</Text>
            <Text style={{ color: '#8e8e8e' }}>{basketTotal}$</Text>
          </View>
          {/* 배달요금 */}
          <View style={totalSection}>
            <Text style={{ color: '#8e8e8e' }}>Delivery Fee</Text>
            <Text style={{ color: '#8e8e8e' }}>5.99$</Text>
          </View>
          {/* Total */}
          <View style={totalSection}>
            <Text>Order Total</Text>
            <Text style={{ fontWeight: '800' }}>
              {(basketTotal + 5.99).toFixed(2)}$
            </Text>
          </View>
          {/* 주문 버튼 */}
          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrderScreen')}
            style={placeOrderBtn}
          >
            <Text style={placeOrder}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  basket: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restaurantTitle: {
    textAlign: 'center',
    color: '#8e8e8e',
  },
  closeBtn: {
    borderRadius: 100,
    backgroundColor: '#eeeeee',
    position: 'absolute',
    top: 10,
    right: 12,
  },
  basketTitleClose: {
    padding: 14,
    borderColor: '#eeeeee',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  basketImage: {
    height: 40,
    width: 40,
    backgroundColor: '#8e8e8e',
    padding: 10,
    borderRadius: 100,
  },
  imageDeliverChange: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  menuImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  remove: {
    color: '#00CCBB',
    fontSize: 14,
  },
  menuContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  menuSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  totalSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalFeePlaceOrder: {
    padding: 25,
    backgroundColor: 'white',
    marginTop: 10,
    rowGap: 12,
  },
  placeOrderBtn: {
    borderRadius: 10,
    backgroundColor: '#00CCBB',
    padding: 14,
  },
  placeOrder: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
