import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeftIcon, CheckIcon, ChevronLeftIcon, ShoppingCartIcon, TruckIcon } from "react-native-heroicons/outline";/* eslint-disable react-native/no-inline-styles */
import StepIndicator from 'react-native-step-indicator';

const orderDetails = {
  id: 1,
  restaurantName: "Nhà hàng Món ngon Việt",
  restaurantAddress: "123 Đường Nguyễn Văn A, Quận 1, TP.HCM",
  restaurantPhone: "0123 456 789",
  customerName: "Nguyễn Văn B",
  customerAddress: "456 Đường Lê Lợi, Quận 2, TP.HCM",
  customerPhone: "0987 654 321",
  totalPrice: 450000,
  orderStatus: "Đang xử lý",
  estimatedTime: "30 phút",
  restaurantImage: "https://th.bing.com/th/id/R.7135c22d4bd7fa00aabb47c8fa076130?rik=rD9im5Tkd6wKcg&pid=ImgRaw&r=0",  // Thay bằng URL hình ảnh thực tế
  foodItems: [
    { id: 1, name: "Phở bò", price: 75000 },
    { id: 2, name: "Bún chả", price: 60000 },
  ],
  promotions: [
    { id: 1, name: "Giảm giá 10% cho đơn hàng trên 300,000 đ" },
  ],
  paymentMethod: "Đã thanh toán online",
};

const getStepIndicatorIconConfig = ({
  position,
  stepStatus,
}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#00CCBB',
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    case 1: {
      iconConfig.name = 'location-on';
      break;
    }
    case 2: {
      iconConfig.name = 'assessment';
      break;
    }
    case 3: {
      iconConfig.name = 'payment';
      break;
    }
    case 4: {
      iconConfig.name = 'track-changes';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const indicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00CCBB',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#00CCBB',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#00CCBB',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#00CCBB',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#00CCBB',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#00CCBB',
};

const titleMap = [
  'Xác nhận đơn hàng',
  'Đang giao hàng',
  'Xác nhận đã nhận hàng',
]

const OrderDetailScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="mr-8" onPress={() => {
          navigation.navigate("OrderList");
        }}>
          <ArrowLeftIcon color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chi tiết đơn hàng',
    });
  }, [navigation]);

  const renderStepIndicator = (params) => {
    const colorMap = (status) => {
      let value = "#000000";
      switch (status) {
        case "current":
          value = "#00CCBB";
          break;
        case "finished":
          value = "#ffffff";
          break;
        default:
          value = "#000000";
      }
      return value;
    }
    let value = <CheckIcon color={"#000000"} />;
    switch (params.position) {
      case 0:
        value = <ShoppingCartIcon color={colorMap(params.currentStatus)}  />;
        break;
      case 1:
        value = <TruckIcon color={colorMap(params.currentStatus)}  />;
        break;
      case 2:
        <CheckIcon color={colorMap(params.currentStatus)} />;
    }
    return value;
  }

  const handleNextStep = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate("OrderList");
    }
  }

  return (
    <ScrollView>
      <View className="bg-white p-4 mb-4 shadow-md rounded-md">
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={indicatorStyles}
            currentPosition={currentPage}
            onPress={onStepPress}
            stepCount={3}
            renderStepIndicator={renderStepIndicator}
            labels={[
              'Chờ xác nhận',
              'Đang giao hàng',
              'Nhận hàng',
            ]}
          />
        </View>
        <View className="flex-row gap-2 mt-2">
          <Image
            source={{ uri: orderDetails.restaurantImage }}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View>
            <Text className="text-lg font-semibold">{orderDetails.restaurantName}</Text>
            <Text className="text-gray-600">{orderDetails.restaurantAddress}</Text>
            <Text className="text-gray-600">SĐT nhà hàng: {orderDetails.restaurantPhone}</Text>
          </View>
        </View>

        <Text className="text-lg font-semibold mt-4">Thông tin khách hàng</Text>
        <Text className="text-gray-600">Tên khách hàng: {orderDetails.customerName}</Text>
        <Text className="text-gray-600">Địa chỉ: {orderDetails.customerAddress}</Text>
        <Text className="text-gray-600">SĐT khách hàng: {orderDetails.customerPhone}</Text>

        <Text className="text-lg font-semibold mt-2">Thông tin đơn hàng</Text>

        {/* <Text className="text-lg font-semibold mt-4">Danh sách món ăn</Text> */}
  
        {orderDetails.foodItems.map((food) => (
          <View key={food.id} className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: orderDetails.restaurantImage }}
              style={{ width: 64, height: 64, borderRadius: 8 }}
            />
            <View>
              <Text className="text-lg font-semibold">{food.name}</Text>
              <Text className="text-gray-600">Giá thành: {food.price.toFixed(2)} vnđ</Text>
              <Text className="text-gray-600">Số lượng: 1</Text>
            </View>
          </View>
        ))}

        <View className="mt-4">
          <Text className="text-gray-600">Trạng thái đơn hàng: {orderDetails.orderStatus}</Text>
          <Text className="text-gray-600">Thời gian dự kiến: {orderDetails.estimatedTime}</Text>
        </View>

        <View className="mt-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Giá đơn hàng</Text>
            <Text>{orderDetails.totalPrice.toFixed(2)} vnđ</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Khuyến mại</Text>
            <Text>-20000.00 vnđ</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Tổng</Text>
            <Text>40000.00 vnđ</Text>
          </View>
          {/* <Text className="text-lg font-semibold mt-4">Ưu đãi và khuyến mại:</Text> */}
          {/* {orderDetails.promotions.map((promo) => (
            <Text key={promo.id} className="text-gray-600">
              {promo.name}
            </Text>
          ))} */}
        </View>

        <Text className="text-lg font-semibold mt-4">Phương thức thanh toán</Text>
        <Text className="text-gray-600">{orderDetails.paymentMethod}</Text>

        <TouchableOpacity
            className="rounded-lg bg-[#00ccbb] p-4 shadow-xl mt-8"
            onPress={handleNextStep}
        >
          <Text className="text-center text-white text-lg font-bold">{ titleMap[currentPage] }</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 10,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});
