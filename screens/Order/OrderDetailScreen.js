import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { ArrowLeftIcon, CheckIcon, ChevronLeftIcon, ShoppingCartIcon, TruckIcon, XCircleIcon, XMarkIcon } from "react-native-heroicons/outline";/* eslint-disable react-native/no-inline-styles */
import StepIndicator from 'react-native-step-indicator';
import { back } from "react-native/Libraries/Animated/Easing";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import InputField from "../../components/InputField";

const discountCodes = [
  {
    id: 1,
    code: "Giảm 10k cho đơn hàng trên 100k",
    discount: 10000,
    condition: 100000,
  },
  {
    id: 2,
    code: "Giảm 20k cho đơn hàng trên 200k",
    discount: 20000,
    condition: 200000,
  },
  {
    id: 3,
    code: "Giảm 30k cho đơn hàng trên 300k",
    discount: 30000,
    condition: 300000,
  },
  {
    id: 4,
    code: "Giảm 40k cho đơn hàng trên 400k",
    discount: 40000,
    condition: 400000,
  }
]

const address = [
  {
    id: 1,
    address: "62 Đa sĩ, Kiến Hưng, Hà Đông",
    phone_number: "0123456789",
    customer_name: "Trần Thanh Thế",
  },
  {
    id: 2,
    address: "L10 Tầng 10 - Tòa Vincom Center - Quận 1",
    phone_number: "0123456789",
    customer_name: "Nguyễn Văn A",
  },
  {
    id: 3,
    address: "Tầng 9 - Tòa nhà 3D Center - Cầu Giấy",
    phone_number: "0123456789",
    customer_name: "Nguyễn Văn B",
  },
  {
    id: 4,
    address: "123 Đường Nguyễn Văn A, Quận 1, TP.HCM",
    phone_number: "0123456789",
    customer_name: "Nguyễn Văn C",
  }
]

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

const OrderDetailScreen = ({ navigation, route }) => {
  const { isConfirmMode } = route.params || { isConfirmMode: true };
  const [currentPage, setCurrentPage] = React.useState(0);
  const [addressIndex, setAdderssIndex] = React.useState(0);
  const [showSelectAddressModal, setShowSelectAddressModal] = React.useState(false);
  const currentUser = useSelector(selectUser);
  const _restaurantView = currentUser?.user?.isRestaurant;
  const _customerConfirmModeView = !_restaurantView && isConfirmMode;
  const _customerOrderModeView = !_restaurantView && isConfirmMode;
  const [addAddress, setAddAddress] = React.useState(false);
  const [addressName, setAddressName] = React.useState("");
  const [addressPhone, setAddressPhone] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [discountCodeIndex, setDiscountCodeIndex] = React.useState(-1);
  const [showDiscountCodeModal, setShowDiscountCodeModal] = React.useState(false);

  React.useEffect(() => {
    setAddAddress(false);
    setAddAddress("");
    setAddressPhone("");
    setCustomerName("");
  }, [showSelectAddressModal])

  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="mr-8" onPress={() => {
          if (currentUser?.user?.isRestaurant) {
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

  const handleOrder = () => {
    navigation.navigate("Prepare");
  }

  const handleCancelOrder = () => {
    navigation.navigate("OrderList");
  }

  const handleAddAddress = () => {
    if (!addressName || !addressPhone || !customerName) return;
    address.push({
      id: address.length + 1,
      address: addressName,
      phone_number: addressPhone,
      customer_name: customerName,
    });
    setAdderssIndex(address.length - 1);
    setShowSelectAddressModal(false);
  }

  return (
    <ScrollView>
      <View className="bg-white p-4 mb-4 shadow-md rounded-md">
        {
          !isConfirmMode ? <View style={styles.stepIndicator}>
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
            source={{ uri: orderDetails.restaurantImage }}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View>
            <Text className="text-lg font-semibold">{orderDetails.restaurantName}</Text>
            <Text className="text-gray-600">{orderDetails.restaurantAddress}</Text>
            <Text className="text-gray-600">SĐT nhà hàng: {orderDetails.restaurantPhone}</Text>
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
          {
            _customerConfirmModeView ? 
              <View> 
                <TouchableOpacity onPress={() => setShowSelectAddressModal(true)}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                    }} 
                    className="text-[#00ccbb]"
                  >
                    sửa
                  </Text>
                </TouchableOpacity>
              </View> : null
          }
        </View>
        <View
          className="flex-row items-center"
          style={{
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text className="text-gray-600">Tên khách hàng: {address[addressIndex].customer_name}</Text>
            <Text className="text-gray-600">Địa chỉ: {address[addressIndex].address}</Text>
            <Text className="text-gray-600">Số điện thoại: {address[addressIndex].phone_number}</Text>
          </View>
        </View>

        <Text className="text-lg font-semibold mt-2">Thông tin đơn hàng</Text>

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

        <View
          className="flex-row items-center"
          style={{
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text className="text-lg font-semibold mt-4">Mã giảm giá</Text>
          </View>
          {
            _customerConfirmModeView ? 
              <View> 
                <TouchableOpacity onPress={() => setShowDiscountCodeModal(true)}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                    }} 
                    className="text-[#00ccbb]"
                  >
                    chọn mã
                  </Text>
                </TouchableOpacity>
              </View> : null
          }
        </View>
        <View>
          <Text className="text-gray-600">{ discountCodeIndex >= 0 ? discountCodes[discountCodeIndex].code : "Chưa sử dụng mã giảm giá" }</Text>
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
        </View>

        <Text className="text-lg font-semibold mt-4">Phương thức thanh toán</Text>
        <Text className="text-gray-600">{orderDetails.paymentMethod}</Text>

        {
          _restaurantView ? 
            <TouchableOpacity
              className="rounded-lg bg-[#00ccbb] p-4 shadow-xl mt-8"
              onPress={handleNextStep}
            >
              <Text className="text-center text-white text-lg font-bold">{ titleMap[currentPage] }</Text>
            </TouchableOpacity> : 
            (
              !isConfirmMode ? 
                <TouchableOpacity
                  className="rounded-lg bg-[#00ccbb] p-4 shadow-xl mt-8"
                  onPress={handleCancelOrder}
                >
                  <Text className="text-center text-white text-lg font-bold">Hủy đơn hàng</Text>
                </TouchableOpacity> : 
                <TouchableOpacity
                  className="rounded-lg bg-[#00ccbb] p-4 shadow-xl mt-8"
                  onPress={handleOrder}
                >
                  <Text className="text-center text-white text-lg font-bold">Đặt hàng</Text>
                </TouchableOpacity>
            )
        }
      </View>

      <Modal
        animationType="slide"
        visible={showSelectAddressModal}
        onRequestClose={() => {
          setShowSelectAddressModal(!showSelectAddressModal);
        }}>
        <View style={styles.centeredView}>
          <View style={{
            padding: 22,
          }}>
            <View className="p-4 bg-white shadow-sm">
              <View>
                <Text className="text-lg font-bold">Chọn địa chỉ nhận hàng</Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowSelectAddressModal(!showSelectAddressModal)}
                className="rounded-full absolute top-3 right-2"
              >
                <XMarkIcon color="#00ccbb" height={40} width={40} />
              </TouchableOpacity>
            </View>

            <View className="p-2">
              <TouchableOpacity
                onPress={() => setAddAddress(!addAddress)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                  }} 
                  className="text-[#00ccbb]"
                >
                  { !addAddress ? "Thêm địa chỉ" : "Hủy" }
                </Text>
              </TouchableOpacity>
              {
                addAddress ? (
                  <>
                    <InputField
                      label={'Tên người nhận'}
                      value={customerName}
                      onChangeText={setCustomerName}
                    />
                    <InputField
                      label={'Địa chỉ nhận'}
                      value={addressName}
                      onChangeText={setAddressName}
                    />
                    <InputField
                      label={'Số điện thoại'}
                      value={addressPhone}
                      onChangeText={setAddressPhone}
                    />
                    <TouchableOpacity
                      className="rounded-lg bg-[#00ccbb] p-2 shadow-xl mt-2"
                      onPress={handleAddAddress}
                    >
                      <Text className="text-center text-white text-lg font-bold">Thêm địa chỉ</Text>
                    </TouchableOpacity>
                  </>
                ) : null
              }
            </View>
  
            {
              address.map((item, index) => (
                <View
                  key={index}
                  className="p-2 bg-white shadow-sm mt-2 border border-gray-400"
                >
                  <TouchableOpacity
                    onPress={() => {
                      setAdderssIndex(index);
                      setShowSelectAddressModal(!showSelectAddressModal);
                    }}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-lg font-semibold">{item.customer_name}</Text>
                      <Text className="text-gray-600 ml-2">{item.phone_number}</Text>
                    </View>
                    <Text className="text-gray-600">{item.address}</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={showDiscountCodeModal}
        onRequestClose={() => {
          setShowDiscountCodeModal(!showDiscountCodeModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{
            padding: 22,
          }}>
            <View className="p-4 bg-white shadow-sm">
              <View>
                <Text className="text-lg font-bold">Chọn mã giảm giá</Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowDiscountCodeModal(!showDiscountCodeModal)}
                className="rounded-full absolute top-3 right-2"
              >
                <XMarkIcon color="#00ccbb" height={40} width={40} />
              </TouchableOpacity>
            </View>

            {
              discountCodes.map((item, index) => (
                <View
                  key={index}
                  className="p-2 bg-white shadow-sm mt-2 border border-gray-400"
                >
                  <TouchableOpacity
                    onPress={() => {
                      setDiscountCodeIndex(index);
                      setShowDiscountCodeModal(!showDiscountCodeModal);
                    }}
                  >
                    <View className="">
                      <Text className="text-lg font-semibold">{item.code}</Text>
                      <Text className="text-gray-600 ml-2">{item.condition} vnđ</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        </View>
      </Modal>
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
