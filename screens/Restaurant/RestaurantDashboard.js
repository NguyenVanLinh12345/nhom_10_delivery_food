import { View, Text, ScrollView, Image, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  LinkIcon,
  MapPinIcon,
  ShareIcon,
  StarIcon,
  TagIcon,
  XMarkIcon,
  Bars3Icon
} from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

const DISHES_TAB = 'DISHES_TAB';
const ORDERS_TAB = 'ORDERS_TAB';
const PROMOTIONS_TAB = 'PROMOTIONS_TAB';

const DishesTab = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const OrdersTab = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const PromotionsTab = () => (
  <View style={{ flex: 1, backgroundColor: '#333333' }} />
);

const renderScene = SceneMap({
  [DISHES_TAB]: DishesTab,
  [ORDERS_TAB]: OrdersTab,
  [PROMOTIONS_TAB]: PromotionsTab,
});

const RestaurantDashboardScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: DISHES_TAB, title: 'Món ăn' },
    { key: ORDERS_TAB, title: 'Đơn hàng' },
    { key: PROMOTIONS_TAB, title: 'Mã giảm giá' },
  ]);
  const currentUser = useSelector(selectUser);
  const [restaurant, setRestaurant] = useState({});
  const [isModal, setIsModal] = useState(false);

  let {
    id, imgUrl, title, rating, genre, address, short_description, long, lat
  } = restaurant || {};

  useEffect(() => {
    if (!currentUser || !currentUser.user.id) {
      navigation.navigate("Login");
    }
    setRestaurant(currentUser.user);
  }, [currentUser]);

  useEffect(() => {
    if (restaurant && restaurant.id) {
      id = restaurant.id;
      imgUrl = restaurant.imgUrl;
      title = restaurant.title;
      rating = restaurant.rating;
      genre = restaurant.genre;
      address = restaurant.address;
      short_description = restaurant.short_description;
      long = restaurant.long;
      lat = restaurant.lat;
    }
  }, [restaurant]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleChangeTab = (event) => {
    const newIndex = routes.findIndex((item) => item.key === event.route.key);
    setIndex(newIndex);
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#00ccbb' }}
      style={{ backgroundColor: 'white', border: '1px solid #333' }}
      labelStyle={{ color: 'black' }}
      onTabPress={handleChangeTab}
    />
  );

  return (
    <>
      {/* <ScrollView> */}
        <View className="relative">
          <Image source={{ uri: imgUrl }} className="w-full h-56 bg-gray-300 p-4" />
          {/* <View className="absolute right-4 p-2 top-14 bg-white rounded-full">
            <TouchableOpacity
              className=''
              onPress={() => { setIsModal(true) }}>
              <ShareIcon
                size={20} color="#00ccbb"
              />
            </TouchableOpacity>
          </View> */}


          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-white rounded-full"
            onPress={() => navigation.goBack(null)}
          >
            <Bars3Icon size={20} color="#00ccbb" />
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
        </View>
      {/* </ScrollView> */}
      <TabView
        index={index}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        sceneContainerStyle={{ backgroundColor: 'white' }}
        pagerStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'white' }}
      />
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

export default RestaurantDashboardScreen;
