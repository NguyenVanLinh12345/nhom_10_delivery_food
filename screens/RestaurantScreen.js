import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Button } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  StarIcon,
  TagIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketContainer from "../components/BasketContainer";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";
const RestaurantScreen = ({ route, navigation }) => {
  const {
    params: { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat },
  } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
  }, [dispatch]);
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <BasketContainer />
      <ScrollView>
        <View className="relative">
          <Image source={{ uri: urlFor(imgUrl).url() }} className="w-full h-56 bg-gray-300 p-4" />
          <View className="absolute right-4 p-2 top-14 bg-white rounded-full">
            <TouchableOpacity
              className=''
              onPress={() => { setIsModal(true) }}>
              <ShareIcon
                size={20} color="#00ccbb"
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-white rounded-full"
            onPress={() => navigation.goBack(null)}
          >
            <ArrowLeftIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold ">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">
                    {rating} . {genre}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">Gần . {address}</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y-2 border-gray-100 ">
            <QuestionMarkCircleIcon color="gray" opacity={0.5} size={20} />
            <Text className="pl-2 flex-1 text-sm font-bold">Có bị dị ứng thực phẩm không?</Text>
            <ChevronRightIcon color="#00ccbb" />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">
            Thực đơn
            {/* {DishRows} */}
          </Text>
          {(dishes || []).map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
      <Modal
        visible={isModal}
        onRequestClose={() => setIsModal(false)}
        animationType='slide'
        transparent={true}>
        <View
          style={{
            flex: 1,
            marginBottom: 0,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >

          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              padding: 22,
              width: '100%',
              height: 300,
              borderRadius: 10,
            }}
          >
            <View className="absolute right-4 p-2 top-2 bg-white rounded-full">
              <TouchableOpacity
                onPress={() => { setIsModal(false) }}>
                <XMarkIcon
                  size={25} color="#00ccbb"
                />
              </TouchableOpacity>
            </View>
            <View className='absolute p-3 top-2 '>
              <Text className='font-bold text-lg '>Chia sẻ với bạn bè và gia đình</Text>
            </View>
            <View className='absolute top-20 ' style={{ flex: 1, height: 1, width: '100%', backgroundColor: 'black' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>

              <TouchableOpacity
                onPress={() => { }}
                style={{ alignItems: 'center' }}
              >
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
                  }}
                  style={{ width: 30, height: 30 }} />
                <Text>facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { }}
                style={{ alignItems: 'center' }}
              >
                <TagIcon size={30} color='black' />
                <Text>sao chép thông tin</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { }}
                style={{

                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <LinkIcon size={30} color='black' />
                  <Text >sao chép đường dẫn</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
    </>
  );
};

export default RestaurantScreen;
