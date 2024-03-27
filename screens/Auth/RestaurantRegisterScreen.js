import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { ArrowLeftIcon, AtSymbolIcon, IdentificationIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserIcon } from "react-native-heroicons/outline";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";

const RestaurantRegisterScreen = ({ navigation }) => {
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
            Đăng ký nhà hàng
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
            keyboardType="email-address"
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
            inputType="password"
            fieldButtonFunction={() => { }}
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
            fieldButtonFunction={() => { }}
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
            fieldButtonFunction={() => { }}
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
            fieldButtonFunction={() => { }}
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
            fieldButtonFunction={() => { }}
          />

          <CustomButton label={"Đăng ký nhà hàng"} onPress={() => { navigation.navigate("Home")}} />

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
              <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RestaurantRegisterScreen;