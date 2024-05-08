import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { ArrowLeftIcon, ChevronDoubleRightIcon } from "react-native-heroicons/outline";
import OrderList from "../../components/OrderList";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export const orders = [
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
  // {
  //   id: 6,
  //   restaurantName: "Quán Cơm Bình Dân",
  //   totalPrice: 285.000,
  //   orderStatus: "Đã giao hàng",
  //   estimatedTime: "45 phút",
  //   restaurantImage: "https://yt3.ggpht.com/a-/AAuE7mDCTXG_KGYAm87Om3wRFgKF94nE5amf2FxIJw=s900-mo-c-c0xffffffff-rj-k-no", 
  // },
  // {
  //   id: 7,
  //   restaurantName: "Bún Đậu Mắm Tôm",
  //   totalPrice: 43.000,
  //   orderStatus: "Đang chờ duyệt",
  //   estimatedTime: "30 minutes",
  //   restaurantImage: "https://th.bing.com/th/id/R.7135c22d4bd7fa00aabb47c8fa076130?rik=rD9im5Tkd6wKcg&pid=ImgRaw&r=0",
  // },
  // {
  //   id: 8,
  //   restaurantName: "Pizza Palace",
  //   totalPrice: 89.000,
  //   orderStatus: "Đang giao hàng",
  //   estimatedTime: "45 phút",
  //   restaurantImage: "https://th.bing.com/th/id/R.d53e70e77a111e9626f767fe7121eb34?rik=SQid8fZ75pcH9w&pid=ImgRaw&r=0",
  // },
  // {
  //   id: 9,
  //   restaurantName: "Nhà hàng Món ngon Việt",
  //   totalPrice: 450.000,
  //   orderStatus: "Đang xử lý",
  //   estimatedTime: "30 phút",
  //   restaurantImage: "https://i.pinimg.com/originals/81/0e/09/810e09428a77edd5ec465cbc847e0cf1.jpg",
  // },
  // {
  //   id: 10,
  //   restaurantName: "Quán Cơm Bình Dân",
  //   totalPrice: 285.000,
  //   orderStatus: "Đã giao hàng",
  //   estimatedTime: "45 phút",
  //   restaurantImage: "https://yt3.ggpht.com/a-/AAuE7mDCTXG_KGYAm87Om3wRFgKF94nE5amf2FxIJw=s900-mo-c-c0xffffffff-rj-k-no", 
  // },
  // {
  //   id: 11,
  //   restaurantName: "Bún Đậu Mắm Tôm",
  //   totalPrice: 43.000,
  //   orderStatus: "Đang chờ duyệt",
  //   estimatedTime: "30 minutes",
  //   restaurantImage: "https://th.bing.com/th/id/R.7135c22d4bd7fa00aabb47c8fa076130?rik=rD9im5Tkd6wKcg&pid=ImgRaw&r=0",
  // },
  // {
  //   id: 12,
  //   restaurantName: "Pizza Palace",
  //   totalPrice: 89.000,
  //   orderStatus: "Đang giao hàng",
  //   estimatedTime: "45 phút",
  //   restaurantImage: "https://th.bing.com/th/id/R.d53e70e77a111e9626f767fe7121eb34?rik=SQid8fZ75pcH9w&pid=ImgRaw&r=0",
  // }
];

const DANG_GIAO = 'DANG_GIAO';
const LICH_SU = 'LICH_SU';
const DA_HUY = 'DA_HUY';

const OrderListScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();

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
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: DANG_GIAO, title: 'Đang giao' },
    { key: LICH_SU, title: 'Lịch sử' },
    { key: DA_HUY, title: 'Đã hủy' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#00ccbb' }}
      style={{ backgroundColor: 'white', border: '1px solid #333' }}
      labelStyle={{ color: 'black' }}
      onTabPress={handleChangeTab}
    />
  );

  const handleChangeTab = (event) => {
    const newIndex = routes.findIndex((item) => item.key === event.route.key);
    setIndex(newIndex);
  }

  const DishesTab = () => (
    <OrderList orders={orders}></OrderList>
  );
  
  const OrdersTab = () => (
    <OrderList orders={orders}></OrderList>
  );
  
  const PromotionsTab = () => (
    <OrderList orders={orders}></OrderList>
  );
  
  const renderScene = SceneMap({
    [DANG_GIAO]: DishesTab,
    [LICH_SU]: OrdersTab,
    [DA_HUY]: PromotionsTab,
  });

  return (
    <>
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
      {/* <OrderList orders={orders}></OrderList> */}
    </>
  );
};

export default OrderListScreen;
