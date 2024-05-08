import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserprofileScreen from "./screens/User/UserprofileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from "./screens/BasketScreen";
import {
  CardStyleInterpolators,
  TransitionPresets,
  TransitionSpecs,
} from "@react-navigation/stack";
import PreparingScreen from "./screens/PreparingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import Dummy from "./screens/Dummy";
import OrderListScreen from "./screens/Order/OrderListScreen";
import OrderDetailScreen from "./screens/Order/OrderDetailScreen";
import RestaurantRegisterScreen from "./screens/Auth/RestaurantRegisterScreen";
import RestaurantDashboardScreen from "./screens/Restaurant/RestaurantDashboard";
import AddressesScreen from "./screens/User/AddressesScreen";
const Stack = createNativeStackNavigator();
import AddAddressScreen from "./screens/User/AddAddressScreen";
import CoinScreen from "./screens/User/CoinScreen";
import AddVoucher from "./screens/Restaurant/AddVoucher";
import AddDishes from "./screens/Restaurant/AddDishes";
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CoinScreen" component={CoinScreen} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
            <Stack.Screen name="Addresses" component={AddressesScreen} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="RestaurantRegister" component={RestaurantRegisterScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="User" component={UserprofileScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Basket" component={BasketScreen} options={{ presentation: "modal", headerShown: false, }} />
            <Stack.Screen name="Prepare" component={PreparingScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="OrderList" component={OrderListScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="RestaurantDashboard" component={RestaurantDashboardScreen} />
            <Stack.Screen name="AddDishes" component={AddDishes} />
            <Stack.Screen name="AddVoucher" component={AddVoucher} />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
