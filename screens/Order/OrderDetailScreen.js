import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeftIcon, CheckIcon, ShoppingCartIcon, TruckIcon } from "react-native-heroicons/outline";/* eslint-disable react-native/no-inline-styles */
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { ADDRESS, DISCOUNT_BY_LEVEL, DISCOUNT_CODES, MAP_ORDER_STATUS, ORDER_STATUS, baseUrl, dishesData, restaurantsData } from "../../constants";
import { urlFor } from "../../sanity";
import { customerModel } from "../../models/customer.model";
import { trigerRefresh } from "../../slices/restaurantSlice";

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

const OrderDetailScreen = ({ navigation, route }) => {
  const { isConfirmMode } = route.params || { isConfirmMode: true };
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [orderDetail, setOrderDetail] = React.useState(null);
  const currentUser = useSelector(selectUser);
  const _restaurantView = currentUser?.user?.isRestaurant;
  const _customerConfirmModeView = !_restaurantView && isConfirmMode;
  const _customerOrderModeView = !_restaurantView && isConfirmMode;


  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="mr-8" onPress={() => {
          if (currentUser?.user?.isRestaurant) {
            dispatch(trigerRefresh())
            navigation.navigate("RestaurantDashboard")
          } else {
            navigation.navigate("OrderList")
          }
        }}>
          <ArrowLeftIcon color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentUser]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chi tiết đơn hàng',
    });
  }, [navigation]);

  React.useEffect(() => {
    const orderId = route.params?.orderId;
    if (!orderId) return;
    fetch(baseUrl + '/orders/' + orderId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('json', json);
        const restaurant = restaurantsData.find((restaurant) => restaurant._id === json.restaurantId);
        const customer = customerModel.findOne(json.customerId);
        setCurrentPage(json.status || 0);
        const order = {
          ...json,
          restaurantName: restaurant.name,
          restaurantAddress: restaurant.address,
          restaurantPhone: "0977856383",
          customerName: json.phone_number,
          customerAddress: json.address,
          customerPhone: json.phone_number,
          totalPrice: 450000,
          orderStatus: MAP_ORDER_STATUS[json.status] || "Đang xử lý",
          estimatedTime: "30 phút",
          restaurantImage: restaurant.image,  // Thay bằng URL hình ảnh thực tế
          foodItems: json.dishes.map((dish) => {
            const dishData = dishesData.find((d) => d._id === dish.dishId);
            return {
              id: dish.dishId,
              name: dishData.name,
              price: dishData.price,
              quantity: dish.quantity,
              image: dishData.image,
            }
          }),
          promotions: [
            { id: 1, name: "Giảm giá 10% cho đơn hàng trên 300,000 đ" },
          ],
          paymentMethod: json.payment_method,
        }
        setOrderDetail(order);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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
    handleUpdateOrderStatus((orderDetail.status || 0) + 1)
  }

  const handleUpdateOrderStatus = (status = 0) => {
    fetch(baseUrl + '/orders/' + orderDetail._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (_restaurantView) {
          dispatch(trigerRefresh())
          navigation.navigate("RestaurantDashboard");
        } else {
          navigation.navigate("Home");
        }
      })
  }

  return (
    <>
      {
        orderDetail ?
          (
            <ScrollView>
              <View className="bg-white p-4 mb-4 shadow-md rounded-md">
                {
                  orderDetail.status === ORDER_STATUS.HOAN_THANH ? <Text className="text-lg font-semibold" style={{ color: '#00ccbb' }}>Đơn hàng đã hoàn thành</Text> : null
                }
                {
                  orderDetail.status === ORDER_STATUS.DA_HUY ? <Text className="text-lg font-semibold" style={{ color: '#fb6060' }}>Đơn hàng bị hủy</Text> : null
                }
                {
                  orderDetail.status < 2 ? 
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
                    </View> : null
                }
                <View className="flex-row gap-2 mt-2">
                  <Image
                    source={{
                      uri: urlFor(orderDetail.restaurantImage).url(),
                    }}
                    style={{ width: 80, height: 80, borderRadius: 8 }}
                  />
                  <View>
                    <Text className="text-lg font-semibold">{orderDetail.restaurantName}</Text>
                    <Text className="text-gray-600">Địa chỉ: {orderDetail.restaurantAddress}</Text>
                    <Text className="text-gray-600">Số điện thoại: {orderDetail.restaurantPhone}</Text>
                  </View>
                </View>

                <View
                  className="flex-row items-center"
                  style={{
                    justifyContent: 'space-between'
                  }}
                >
                  <View>
                    <Text className="text-lg font-semibold mt-4">Thông tin khách hàng</Text>
                  </View>
                </View>
                <View
                  className="flex-row items-center"
                  style={{
                    justifyContent: 'space-between'
                  }}
                >
                  <View>
                    <Text className="text-gray-600">Tên khách hàng: {currentUser.user.name}</Text>
                    <Text className="text-gray-600">Địa chỉ: {orderDetail.address}</Text>
                    <Text className="text-gray-600">Số điện thoại: {orderDetail.phone_number}</Text>
                  </View>
                </View>

                <Text className="text-lg font-semibold mt-2">Thông tin đơn hàng</Text>

                {orderDetail.foodItems.map((food) => (
                  <View key={food.id} className="flex-row gap-2 mt-2">
                    <Image
                      source={{
                        uri: urlFor(food.image).url(),
                      }}
                      style={{ width: 64, height: 64, borderRadius: 8 }}
                    />
                    <View>
                      <Text className="text-lg font-semibold">{food.name}</Text>
                      <Text className="text-gray-600">Giá thành: {food.price.toFixed(2)} vnđ</Text>
                      <Text className="text-gray-600">Số lượng: {food.quantity}</Text>
                    </View>
                  </View>
                ))}

                <View className="mt-4">
                  <Text className="text-gray-600">Trạng thái đơn hàng: {orderDetail.orderStatus}</Text>
                  <Text className="text-gray-600">Thời gian dự kiến: {orderDetail.estimatedTime}</Text>
                </View>

                <View className="mt-4">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Tổng tiền</Text>
                    <Text>{orderDetail.total_price} vnđ</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Phí vận chuyển</Text>
                    <Text>15000 vnđ</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Giảm giá từ tích điểm {currentUser.user.level ? `(-${DISCOUNT_BY_LEVEL[currentUser.user.level]}%)` : ''}</Text>
                    <Text>- {orderDetail.discount_level} vnđ</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Khuyến mại từ mã giảm giá</Text>
                    <Text>- { orderDetail.discount } vnđ</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Tổng</Text>
                    <Text>{ orderDetail.completed_price } vnđ</Text>
                  </View>
                </View>

                <Text className="text-lg font-semibold mt-4">Phương thức thanh toán</Text>
                <Text className="text-gray-600">{orderDetail.paymentMethod}</Text>

                {
                  orderDetail.status < 2 ? (
                    _restaurantView ? 
                      (
                        <>
                          <TouchableOpacity
                            className="rounded-lg bg-[#00ccbb] p-4 shadow-xl mt-8"
                            onPress={handleNextStep}
                          >
                            <Text className="text-center text-white text-lg font-bold">{ titleMap[currentPage] }</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="rounded-lg bg-[#fb6060] p-4 shadow-xl mt-2"
                            onPress={() => handleUpdateOrderStatus(3)}
                          >
                            <Text className="text-center text-white text-lg font-bold">Hủy đơn hàng</Text>
                          </TouchableOpacity>
                        </>
                      ) : 
                      (
                          <TouchableOpacity
                            className="rounded-lg bg-[#fb6060] p-4 shadow-xl mt-8"
                            onPress={() => handleUpdateOrderStatus(3)}
                          >
                            <Text className="text-center text-white text-lg font-bold">Hủy đơn hàng</Text>
                          </TouchableOpacity>
                      )
                  ) : null
                }
              </View>
            </ScrollView>
          ) :
          (
            <View className="flex-1 justify-center items-center">
              <Text>Loading...</Text>
            </View>
          )
      }
    </>
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
