import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { ChevronDoubleRightIcon } from "react-native-heroicons/outline";

const OrderList = ({ orders }) => {
  const navigation = useNavigation();
  return (
    <View className="">
      <ScrollView>
        {orders.map((item) => (
          <View
            key={item.id}
            className="bg-white p-4 mb-4 shadow-md rounded-md border-b border-gray-400"
          >
            <Text className="text-lg font-semibold">{item.restaurantName}</Text>
            <View className="flex-row gap-4 mt-1">
              <Image
                source={{ uri: item.restaurantImage }}
                style={{ width: 60, height: 60, borderRadius: 8 }}
              />
              <View>
                <Text className="text-gray-600">Tổng giá: {item.totalPrice.toFixed(2)} đồng</Text>
                <Text className="text-gray-600">Trạng thái đơn hàng: {item.orderStatus}</Text>
                <Text className="text-gray-600">Thời gian dự kiến: {item.estimatedTime}</Text>
              </View>
            </View>
            <TouchableOpacity className="flex-row mt-2" onPress={() => { navigation.navigate("OrderDetail", { isConfirmMode: false }) }}>
              <Text 
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                }} 
                className="text-[#00ccbb]"
              >
                Xem chi tiết
              </Text>
              <ChevronDoubleRightIcon size={20} color="#00CCBB"></ChevronDoubleRightIcon>
          </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderList;
