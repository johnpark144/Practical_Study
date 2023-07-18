import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const { orderScreenContainer, PreparingOrderImage, PreparingOrderMsg } =
    styles;

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={orderScreenContainer}>
      <Animatable.Image // Text도 가능
        source={require('../assets/orderLoading.gif')}
        animation='slideInUp' // 애니메이션 종류
        iterationCount={1} // 반복 회수
        style={PreparingOrderImage}
      />

      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        style={PreparingOrderMsg}
      >
        Wating for Restaurant to accept your order !
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color='white' />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

const styles = StyleSheet.create({
  orderScreenContainer: {
    backgroundColor: '#51B8CC',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PreparingOrderImage: {
    height: 150,
    width: 150,
  },
  PreparingOrderMsg: {
    fontSize: 14,
    marginVertical: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
