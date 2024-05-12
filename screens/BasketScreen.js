import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, StyleSheet, Modal } from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { urlFor } from "../sanity";
import { XMarkIcon } from "react-native-heroicons/outline";
import { ADDRESS, DISCOUNT_BY_LEVEL, DISCOUNT_CODES, ORDER_STATUS, baseUrl } from "../constants";
import { selectUser } from "../slices/userSlice";
import InputField from '../components/InputField';

const BasketScreen = ({ navigation }) => {
  const restaurant = useSelector(selectRestaurant);
  const userData = useSelector(selectUser);
  const items = useSelector(selectBasketItems);
  const [groupItemsBasket, setGroupItemsBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  const [addressIndex, setAdderssIndex] = React.useState(0);
  const [showSelectAddressModal, setShowSelectAddressModal] = React.useState(false);
  const [addAddress, setAddAddress] = React.useState(false);
  const [addressName, setAddressName] = React.useState("");
  const [addressPhone, setAddressPhone] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [discountCodeIndex, setDiscountCodeIndex] = React.useState(0);
  const [showDiscountCodeModal, setShowDiscountCodeModal] = React.useState(false);

  React.useEffect(() => {
    setAddAddress(false);
    setAddAddress("");
    setAddressPhone("");
    setCustomerName("");
  }, [showSelectAddressModal])

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsBasket(groupedItems);
  }, [items]);

  const handleOrder = () => {
    const payload = {
      created_at: new Date(),
      restaurantId: restaurant.id,
      customerId: userData.user.id,
      address: ADDRESS[addressIndex].address,
      phone_number: ADDRESS[addressIndex].phone_number,
      discount: DISCOUNT_CODES[discountCodeIndex].discount,
      total_price: basketTotal,
      completed_price: basketTotal - (basketTotal * DISCOUNT_BY_LEVEL[userData.user.level] / 100) + 15000 - DISCOUNT_CODES[discountCodeIndex].discount,
      discountId: DISCOUNT_CODES[discountCodeIndex].id,
      discount_level: (basketTotal * DISCOUNT_BY_LEVEL[userData.user.level] / 100),
      status: ORDER_STATUS.DA_DAT_HANG,
      payment_method: "Thanh toán khi nhận hàng",
      dishes: Object.keys(groupItemsBasket).map((item) => ({
        dishId: item,
        quantity: groupItemsBasket[item].length,
        price: groupItemsBasket[item][0].price
      }))
    };

    fetch(baseUrl + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          items.forEach(element => {
            dispatch(removeFromBasket({ id: element.id }));
          });
          navigation.navigate("Prepare", { orderId: response.insertedId });
        }
      });
  };

  const handleAddAddress = () => {
    if (!addressName || !addressPhone || !customerName) return;
    ADDRESS.push({
      id: ADDRESS.length + 1,
      address: addressName,
      phone_number: addressPhone,
      customer_name: customerName,
    });
    setAdderssIndex(ADDRESS.length - 1);
    setShowSelectAddressModal(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">{restaurant.title}</Text>
            <Text className="text-center text-gray-400">{restaurant.address}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            className="rounded-full bg-gray-100 absolute top-3 right-2"
          >
            <XCircleIcon color="#00ccbb" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">
          <Ionicons name="fast-food" color="#2c9935" size={30} />
          <Text className="flex-1">{ADDRESS[addressIndex].address}</Text>
          <TouchableOpacity onPress={() => setShowSelectAddressModal(true)}>
            <Text className="text-[#00ccbb]">Thay đổi</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">
          <Ionicons name="fast-food" color="#2c9935" size={30} />
          <Text className="flex-1">{DISCOUNT_CODES[discountCodeIndex].code}</Text>
          <TouchableOpacity onPress={() => setShowDiscountCodeModal(true)}>
            <Text className="text-[#00ccbb]">Thay đổi</Text>
          </TouchableOpacity>
        </View>


        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupItemsBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-green-600 text-md font-bold">{items.length} x</Text>

              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600 text-xs">
                {items[0]?.price} vnd
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <AntDesign name="minuscircle" size={16} color="#edd" />
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4 ">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Khác hàng</Text>
            <Text className="text-gray-400">
              {ADDRESS[addressIndex].customer_name}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Số điện thoại</Text>
            <Text className="text-gray-400">
              {ADDRESS[addressIndex].phone_number}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Địa chỉ</Text>
            <Text className="text-gray-400">
              {ADDRESS[addressIndex].address}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Tổng phụ</Text>
            <Text className="text-gray-400">
              {basketTotal} vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Phí giao hàng</Text>
            <Text className="text-gray-400">
              15000 vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Giảm giá từ khuyến mại</Text>
            <Text className="text-gray-400">
              - {DISCOUNT_CODES[discountCodeIndex].discount} vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Giảm giá từ tích điểm {`(-${DISCOUNT_BY_LEVEL[userData.user.level]}%)`}</Text>
            <Text className="text-gray-400">
              - {(basketTotal * DISCOUNT_BY_LEVEL[userData.user.level] / 100)} vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400 font-bold">Tổng</Text>
            <Text className=" text-[#1f1f20] font-extrabold">
              {basketTotal - (basketTotal * DISCOUNT_BY_LEVEL[userData.user.level] / 100) + 15000 - DISCOUNT_CODES[discountCodeIndex].discount} vnd
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-[#00ccbb] p-4 shadow-xl"
            onPress={() => handleOrder()}
          >
            <Text className="text-center text-white text-lg font-bold">Xác nhận</Text>
          </TouchableOpacity>
        </View>
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
                  {!addAddress ? "Thêm địa chỉ" : "Hủy"}
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
              ADDRESS.map((item, index) => (
                <View
                  key={index}
                  className="p-2 bg-white shadow-sm mt-2 border border-gray-400"
                  style={{
                    backgroundColor: index === addressIndex ? "#00ccbb" : "#fff",
                  }}
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
              DISCOUNT_CODES.slice(1, DISCOUNT_CODES.length).map((item, index) => (
                <View
                  key={index}
                  className={`p-2 bg-white shadow-sm mt-2 border border-gray-400`}
                  style={{
                    backgroundColor: (basketTotal + 15000) >= item.condition ? (index + 1 === discountCodeIndex ? "#00ccbb" : "#fff") : "#FFF",
                    opacity: (basketTotal + 15000) >= item.condition ? 1 : 0.4,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if ((basketTotal + 15000) >= item.condition) {
                        setDiscountCodeIndex(index + 1);
                        setShowDiscountCodeModal(!showDiscountCodeModal);
                      }
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
    </SafeAreaView>
  );
};

export default BasketScreen;

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
