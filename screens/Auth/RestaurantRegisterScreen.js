import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { ArrowLeftIcon, AtSymbolIcon, IdentificationIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserIcon } from "react-native-heroicons/outline";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants";
import { setUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const RestaurantRegisterScreen = ({ navigation, route }) => {
  const isEdit = route.params?.isEdit;
  const restaurant = route.params?.restaurant;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEdit && restaurant) {
      setEmail(restaurant.email);
      setPassword(restaurant.password);
      setRestaurantName(restaurant.title);
      setPhoneNumber(restaurant.phone_number);
      setAddress(restaurant.address);
      setDescription(restaurant.short_description);
    }
  }, [restaurant, isEdit]);

  const handleSubmit = () => {
    if (isEdit) {
      // Handle edit restaurant
      fetch(baseUrl + '/restaurants/' + restaurant._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, 
          password, 
          title: restaurantName, 
          phone_number: phoneNumber, 
          address, 
          short_description: description,
        })
      }).then(response => response.json())
        .then(data => {
          dispatch(setUser({
            ...data,
            isRestaurant: true,
            lat: 0,
            long: 0,
        }));
          navigation.navigate("RestaurantDashboard")
        })
    } else {
      fetch(baseUrl + '/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          title: restaurantName, 
          phone_number: phoneNumber, 
          address, 
          short_description: description,
        })
      }).then(response => response.json())
        .then(data => {
          navigation.navigate("Login")
        })
    }
  }
  return (
    <>
      <View className="relative">
        <TouchableOpacity
          className="absolute top-14 left-5 p-2 bg-white rounded-full"
          onPress={() => navigation.goBack(null)}
        >
          <ArrowLeftIcon size={20} color="#00ccbb" />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View className="mt-16" style={{ paddingHorizontal: 25 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginTop: 36,
              marginBottom: 24
            }}>
              {isEdit ? "Sửa thông tin nhà hàng" : "Đăng ký nhà hàng"}
          </Text>

          <InputField
            label={'Email'}
            icon={
              <AtSymbolIcon
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <InputField
            label={'Mật khẩu'}
            icon={
              <LockClosedIcon
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={password}
            onChangeText={setPassword}
          />

          <InputField
            label={'Tên của nhà hàng'}
            icon={
              <UserIcon
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={restaurantName}
            onChangeText={setRestaurantName}
          />

          <InputField
            label={'Số điện thoại'}
            icon={
              <PhoneIcon
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <InputField
            label={'Địa chỉ của nhà hàng'}
            icon={
              <MapPinIcon
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={address}
            onChangeText={setAddress}
          />

          <InputField
            label={'Mô tả'}
            icon={
              <IdentificationIcon
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={description}
            onChangeText={setDescription}
          />

          <CustomButton label={isEdit ? "Lưu thay đổi" : "Đăng ký nhà hàng"} onPress={handleSubmit} />

          {
            !isEdit && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                <Text>Bạn đã có tài khoản?</Text>
                <TouchableOpacity
                  className="ml-1"
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{ color: '#00ccbb', fontWeight: '700' }}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    </>
  );
};

export default RestaurantRegisterScreen;