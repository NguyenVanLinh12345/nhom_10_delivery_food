import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image } from "react-native";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { urlFor } from "../sanity";
// import Currency from "react-currency-formatter";

const BasketScreen = ({ navigation }) => {
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupItemsBasket, setGroupItemsBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsBasket(groupedItems);
  }, [items]);

  const changeTimeDelivery = () => {
    console.log("Thay doi thoi gian giao hang");
  }

  console.log(groupItemsBasket);

  return (
    <SafeAreaView className="flex-1 bg-white">
       {/* <View className="bg-red-600 rounded-lg fixed top-20 left-0 right-0 z-10" >
        <Text>hehsdjjfe sdfsdfsd sdsdfsdfsd s dsdsds</Text>
      </View> */}

      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Đơn hàng</Text>
            <Text className="text-center text-gray-400">Dê Ninh Bình</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            className="rounded-full bg-gray-100 absolute   top-3  right-2"
          >
            <XCircleIcon color="#00ccbb" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Ionicons name="fast-food" color="#2c9935" size={30} />
          <Text className="flex-1"> Đặt hàng ngay</Text>
          <TouchableOpacity onPress={() => changeTimeDelivery()}>
            <Text className="text-[#00ccbb]">Thay đổi</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-1">
          <Ionicons name="fast-food" color="#2c9935" size={30} />
          <Text className="flex-1"> Giao hàng trong 10-15 phút</Text>
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

              <Text className="text-gray-600 text-xs line-through">
                {/* <Currency quantity={items[0]?.price} currency="VND" z /> */}
                { items[0]?.price } vnd
              </Text>
              <Text className="text-gray-600 text-xs">
                {/* <Currency quantity={items[0]?.price - 100} currency="VND" z /> */}
                { items[0]?.price - 100 } vnd
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
            <Text className="text-gray-400">Tổng phụ</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={basketTotal} currency="VND" /> */}
              { basketTotal } vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Phí giao hàng</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={13.3} currency="VND" /> */}
              13.3 vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Giảm giá từ khuyến mại</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={-15} currency="VND" /> */}
              -15 vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Giảm giá từ tích điểm</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={-15} currency="VND" /> */}
              -15 vnd
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400 font-bold">Tổng</Text>
            <Text className=" text-[#1f1f20] font-extrabold">
              {/* <Currency quantity={basketTotal + 13.3} currency="VND" /> */}
              { basketTotal + 13.3 } vnd
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-[#00ccbb] p-4 shadow-xl"
            onPress={() => navigation.navigate("OrderDetail")}
          >
            <Text className="text-center text-white text-lg font-bold">Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
