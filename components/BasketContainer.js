import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { useNavigation } from "@react-navigation/native";
// import Currency from "react-currency-formatter";

// Đây là cái ô màu xanh hiển thị ra khi có đơn hàng 
// Khi bấm vào cái này sẽ chuyển đến giỏ hàng (Basket = giỏ hàng)
const BasketContainer = () => {
  const items = useSelector(selectBasketItems);
  const basketTotalPrice = useSelector(selectBasketTotal);
  const navigation = useNavigation();

 
if(items.length === 0)
return null
  return (
    <View className="absolute bottom-14 w-full z-50">
      <TouchableOpacity  onPress={() => navigation.navigate("Basket")}  className="flex-row bg-[#00ccbb] p-4 rounded-lg shadow-lg items-center space-x-1 mx-5 ">
        <Text className="text-white font-extrabold text-xl rounded-md bg-[#01a296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-center">Xem giỏ hàng</Text>
        <Text className="text-lg text-white font-extrabold">
          {/* <Currency quantity={basketTotalPrice} currency="INR" /> */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketContainer;
