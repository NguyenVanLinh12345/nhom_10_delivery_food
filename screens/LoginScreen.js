import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { ArrowLeftIcon, AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";

// import LoginSVG from '../assets/images/misc/login.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useState } from "react";
import { restaurantModel } from "../models/restaurant.model";
import { customerModel } from "../models/customer.model";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { baseUrl } from "../constants";

// Trong React Navigation, các component được chuyển đến trong navigation stack sẽ 
// tự động nhận được hai prop quan trọng là route và navigation
function LoginScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const customer = customerModel.findByEmailAndPassword(email, password);
        fetch(baseUrl + "/restaurants/get-all")
            .then(response => response.json())
            .then(data => {
                const restaurant = data.find(restaurant => restaurant.email === email && restaurant.password === password);
        
                if (restaurant || customer) {
                    if (customer) {
                        dispatch(setUser(customer));
                        navigation.navigate('Home');
                    }
            
                    if (restaurant) {
                        dispatch(setUser({
                            ...restaurant,
                            isRestaurant: true,
                            lat: 0,
                            long: 0,
                        }));
                        navigation.navigate('RestaurantDashboard');
                    }
                }
            })
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ alignItems: 'center' }}>
                    </View>

                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 28,
                            fontWeight: '500',
                            color: '#333',
                            marginTop: 36,
                            marginBottom: 24
                        }}>
                        Đăng nhập
                    </Text>

                    <InputField
                        label={'Tài khoản'}
                        value={email}
                        onChange={setEmail}
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
                        value={password}
                        onChange={setPassword}
                        icon={
                            <LockClosedIcon
                                name="ios-lock-closed-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        inputType="password"
                        fieldButtonLabel={"Quên mật khẩu?"}
                    />

                    <CustomButton label={"Login"} onPress={handleLogin} />

                    <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                        Hoặc, đăng nhập với ...
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 30,
                        }}>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={{
                                borderColor: '#ddd',
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                            }}>
                            <Text>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={{
                                borderColor: '#ddd',
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                            }}>
                            <Text>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={{
                                borderColor: '#ddd',
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                            }}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 16,
                        }}>
                        <Text>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity
                            className="ml-1"
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ color: '#00ccbb', fontWeight: '700' }}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 16,
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RestaurantRegister')}
                        >
                            <Text style={{ color: '#00ccbb', fontWeight: '700' }}>Tạo tài khoản bán hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default LoginScreen;