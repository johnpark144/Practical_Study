import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectsetRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import MapView, { MapMarker } from 'react-native-maps';

const DeliveryScreen = () => {
  const {
    deliveryScreenContainer,
    closeIconHelp,
    orderHelp,
    estimatedArrival,
    eta,
    etaContainer,
    etaSection,
    MapContainer,
    bottomPartImage,
    bottomPartSection,
    call,
  } = styles;
  const navigation = useNavigation();
  const restaurant = useSelector(selectsetRestaurant);

  return (
    <View style={deliveryScreenContainer}>
      <SafeAreaView style={{ zIndex: 50 }}>
        {/* 닫기버튼, Order Help */}
        <View style={closeIconHelp}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <EvilIcons name='close' size={30} color='white' />
          </TouchableOpacity>
          <Text style={orderHelp}>Order Help</Text>
        </View>
        {/* ETA, 자전거이미지, Progress Bar, 준비중표시 */}
        <View style={etaContainer}>
          <View style={etaSection}>
            <View>
              <Text style={estimatedArrival}>Estimated Arrival</Text>
              <Text style={eta}>45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: 'https://links.papareact.com/fls' }}
              style={{ height: 80, width: 80 }}
            />
          </View>
          <Progress.Bar rcle size={60} indeterminate={true} color='#00CCBB' />
          <Text>Your order at {restaurant.title} is being prepared</Text>
        </View>
      </SafeAreaView>
      {/* 지도 */}
      <MapView
        initialRegion={{
          // 초기 지역 위도, 경도
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005, // 첫 화면 확대 정도(작을수록 확대)
          longitudeDelta: 0.005, // 첫 화면 확대 정도(작을수록 확대)
        }}
        mapType='mutedStandard' // 지도 종류
        style={MapContainer}
      >
        <MapMarker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
          title={restaurant.title} // 마커 타이틀
          description={restaurant.short_description} // 마커 설명
          identifier='origin'
          pinColor='#00CCBB'
        />
      </MapView>
      {/* 밑 부분 이미지, 라이더, Call */}
      <SafeAreaView style={bottomPartSection}>
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          style={bottomPartImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20 }}>John Park</Text>
          <Text style={{ color: '#8e8e8e' }}>Your Rider</Text>
        </View>
        <Text onPress={() => navigation.navigate('Camera')} style={call}>
          Call
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  deliveryScreenContainer: {
    backgroundColor: '#51B8CC',
    flex: 1,
  },
  closeIconHelp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderHelp: {
    fontWeight: '100',
    color: 'white',
    fontSize: 20,
  },
  estimatedArrival: {
    fontSize: 20,
    color: '#8e8e8e',
  },
  eta: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  etaContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 10,
    padding: 20,
    zIndex: 50,
    shadowColor: 'black', // 그림자 색
    elevation: 4, // 그림자 강도
  },
  etaSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MapContainer: {
    flex: 1,
    marginTop: -10,
    zIndex: 0,
  },
  bottomPartImage: {
    height: 40,
    width: 40,
    backgroundColor: 'gray',
    padding: 4,
    borderRadius: 100,
    marginLeft: 10,
  },
  bottomPartSection: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    height: 80,
  },
  call: {
    color: '#00CCBB',
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
  },
});
