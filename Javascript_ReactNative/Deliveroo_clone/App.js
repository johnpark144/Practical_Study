import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import RestaurantScreen from './screen/RestaurantScreen';
import BasketScreen from './screen/BasketScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import PreparingOrderScreen from './screen/PreparingOrderScreen';
import DeliveryScreen from './screen/DeliveryScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigator>
          {/* name은 navigate할때 사용됨 */}
          <Screen name='Home' component={HomeScreen} />
          <Screen name='Restaurant' component={RestaurantScreen} />
          <Screen
            name='Basket'
            component={BasketScreen}
            options={{ presentation: 'modal', headerShown: false }} // 모달로 사용
          />
          <Screen
            name='PreparingOrderScreen'
            component={PreparingOrderScreen}
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Screen
            name='Delivery'
            component={DeliveryScreen}
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
        </Navigator>
      </Provider>
    </NavigationContainer>
  );
}
