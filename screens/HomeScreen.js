import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { TouchableOpacity, Image, LogBox, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { featuredCategoriesData } from "../constants";

const HomeScreen = () => {
  // state and hooks
  const navigation = useNavigation();
  const customer = useSelector(selectUser);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // side effects
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (!customer || (!customer?.user?.id && !customer?.user?._id)) {
      console.log("Redirecting to login screen", customer);
      navigation.navigate("Login");
    }

    return () => {
      console.log("Home screen unmounted");
    }
  }, [customer]);

  useEffect(() => {
    setFeaturedCategories(featuredCategoriesData)
  }, []);


  return (
    <>
      <SafeAreaView className="bg-white pt-5">
        {/* header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
              }}
              className=" h-7 w-7 bg-gray-300 p-4  rounded-full"
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Trần Thanh Thế</Text>
            <Text className="font-bold text-base">
              62 Đa sĩ, Kiến Hưng, Hà Đông <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>

          <ShoppingCartIcon onPress={() => {
            navigation.navigate("OrderList");
          }} size={25} color="#00CCBB" />
          {/* Đây là icon người, dùng để login */}
          <UserIcon onPress={() => {
            navigation.navigate("Login");
          }} size={25} color="#00CCBB" />

        </View>

        {/* search bar */}
        <View className="flex-row mx-4 items-center space-x-2 pb-2">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-md">
            <MagnifyingGlassIcon color="gray" />
            <TextInput placeholder="Nhà hàng, món ăn,..." keyboardType="default" />
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>

        {/* body */}
        <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingBottom: 100 }}>
          {/* categories */}
          <Categories />

          {/* featured rows */}
          {featuredCategories.map((category) => (
            <FeaturedRow
              key={category._id}
              title={category.name}
              description={category.short_description}
              id={category._id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
