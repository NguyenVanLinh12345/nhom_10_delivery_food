import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { ArrowLeftIcon, ChevronDoubleRightIcon } from "react-native-heroicons/outline";

const orders = [
  {
    id: 1,
    restaurantName: "Nhà hàng Món ngon Việt",
    totalPrice: 450.000,
    orderStatus: "Đang xử lý",
    estimatedTime: "30 phút",
    restaurantImage: "https://i.pinimg.com/originals/81/0e/09/810e09428a77edd5ec465cbc847e0cf1.jpg",
  },
  {
    id: 2,
    restaurantName: "Quán Cơm Bình Dân",
    totalPrice: 285.000,
    orderStatus: "Đã giao hàng",
    estimatedTime: "45 phút",
    restaurantImage: "https://yt3.ggpht.com/a-/AAuE7mDCTXG_KGYAm87Om3wRFgKF94nE5amf2FxIJw=s900-mo-c-c0xffffffff-rj-k-no", 
  },
  {
    id: 3,
    restaurantName: "Bún Đậu Mắm Tôm",
    totalPrice: 43.000,
    orderStatus: "Đang chờ duyệt",
    estimatedTime: "30 minutes",
    restaurantImage: "https://th.bing.com/th/id/R.7135c22d4bd7fa00aabb47c8fa076130?rik=rD9im5Tkd6wKcg&pid=ImgRaw&r=0",
  },
  {
    id: 4,
    restaurantName: "Pizza Palace",
    totalPrice: 89.000,
    orderStatus: "Đang giao hàng",
    estimatedTime: "45 phút",
    restaurantImage: "https://th.bing.com/th/id/R.d53e70e77a111e9626f767fe7121eb34?rik=SQid8fZ75pcH9w&pid=ImgRaw&r=0",
  },
  {
    id: 5,
    restaurantName: "Nhà hàng Món ngon Việt",
    totalPrice: 450.000,
    orderStatus: "Đang xử lý",
    estimatedTime: "30 phút",
    restaurantImage: "https://i.pinimg.com/originals/81/0e/09/810e09428a77edd5ec465cbc847e0cf1.jpg",
  },
  {
    id: 6,
    restaurantName: "Quán Cơm Bình Dân",
    totalPrice: 285.000,
    orderStatus: "Đã giao hàng",
    estimatedTime: "45 phút",
    restaurantImage: "https://yt3.ggpht.com/a-/AAuE7mDCTXG_KGYAm87Om3wRFgKF94nE5amf2FxIJw=s900-mo-c-c0xffffffff-rj-k-no", 
  },
  {
    id: 7,
    restaurantName: "Bún Đậu Mắm Tôm",
    totalPrice: 43.000,
    orderStatus: "Đang chờ duyệt",
    estimatedTime: "30 minutes",
    restaurantImage: "https://th.bing.com/th/id/R.7135c22d4bd7fa00aabb47c8fa076130?rik=rD9im5Tkd6wKcg&pid=ImgRaw&r=0",
  },
  {
    id: 8,
    restaurantName: "Pizza Palace",
    totalPrice: 89.000,
    orderStatus: "Đang giao hàng",
    estimatedTime: "45 phút",
    restaurantImage: "https://th.bing.com/th/id/R.d53e70e77a111e9626f767fe7121eb34?rik=SQid8fZ75pcH9w&pid=ImgRaw&r=0",
  },
  {
    id: 9,
    restaurantName: "Nhà hàng Món ngon Việt",
    totalPrice: 450.000,
    orderStatus: "Đang xử lý",
    estimatedTime: "30 phút",
    restaurantImage: "https://i.pinimg.com/originals/81/0e/09/810e09428a77edd5ec465cbc847e0cf1.jpg",
  },
  {
    id: 10,
    restaurantName: "Quán Cơm Bình Dân",
    totalPrice: 285.000,
    orderStatus: "Đã giao hàng",
    estimatedTime: "45 phút",
    restaurantImage: "https://yt3.ggpht.com/a-/AAuE7mDCTXG_KGYAm87Om3wRFgKF94nE5amf2FxIJw=s900-mo-c-c0xffffffff-rj-k-no", 
  },
  {
    id: 11,
    restaurantName: "Bún Đậu Mắm Tôm",
    totalPrice: 43.000,
    orderStatus: "Đang chờ duyệt",
    estimatedTime: "30 minutes",
    restaurantImage: "https://th.bing.com/th/id/R.7135c22d4bd7fa00aabb47c8fa076130?rik=rD9im5Tkd6wKcg&pid=ImgRaw&r=0",
  },
  {
    id: 12,
    restaurantName: "Pizza Palace",
    totalPrice: 89.000,
    orderStatus: "Đang giao hàng",
    estimatedTime: "45 phút",
    restaurantImage: "https://th.bing.com/th/id/R.d53e70e77a111e9626f767fe7121eb34?rik=SQid8fZ75pcH9w&pid=ImgRaw&r=0",
  }
];

const OrderListScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="mr-8" onPress={() => {
          navigation.navigate("Home");
        }}>
          <ArrowLeftIcon color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Danh sách đơn hàng',
    });
  }, [navigation]);

  return (
    <View className="">
      <ScrollView>
        {orders.map((item) => (
          <View
            key={item.id}
            className="bg-white p-4 mb-4 shadow-md rounded-md"
          >
            <Text className="text-lg font-semibold mt-1">{item.restaurantName}</Text>
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
            <TouchableOpacity className="flex-row mt-2" onPress={() => { navigation.navigate("OrderDetail") }}>
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

export default OrderListScreen;
