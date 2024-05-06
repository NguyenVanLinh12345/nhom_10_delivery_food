import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StyleSheet, Button } from "react-native";
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

  const [modalVisible, setModalVisible] = useState(false);
  const handleClick = () => {
    setModalVisible(!modalVisible);
  }
  const handleAddDish = () => {
    // Handle add dish here
    navigation.navigate('AddDishes');

  };

  const handleAddVoucher = () => {
    // Handle add voucher here
    navigation.navigate('AddVoucher');

  };

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
          onPress={handleClick}
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
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleClick
          }
        >

          <View style={styles.centeredView}>

            <View style={styles.modalView}>
              <TouchableOpacity className="absolute right-0 top-1 bg-white rounded-full" onPress={handleClick}>
                <XMarkIcon size={30} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddDish}>
                <Text style={styles.modalButtonText}>Thêm món ăn mới</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddVoucher}>
                <Text style={styles.modalButtonText}>Thêm mã giảm giá</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: "#00ffff",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  closeButton: {
    backgroundColor: "#dc3545", // Màu nút đóng
  },
});
export default RestaurantDashboardScreen;
