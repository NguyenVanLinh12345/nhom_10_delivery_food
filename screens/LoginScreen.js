import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { ArrowLeftIcon, AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";

// import LoginSVG from '../assets/images/misc/login.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

// Trong React Navigation, các component được chuyển đến trong navigation stack sẽ 
// tự động nhận được hai prop quan trọng là route và navigation
function LoginScreen({ route, navigation }) {

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

            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ alignItems: 'center' }}>
                        {/* <LoginSVG
                            height={300}
                            width={300}
                            style={{ transform: [{ rotate: '-5deg' }] }}
                        /> */}
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
                        Login
                    </Text>

                    <InputField
                        label={'Email ID'}
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
                        label={'Password'}
                        icon={
                            <LockClosedIcon
                                name="ios-lock-closed-outline"
                                size={20}
                                color="#666"
                                style={{ marginRight: 5 }}
                            />
                        }
                        inputType="password"
                        fieldButtonLabel={"Forgot?"}
                        fieldButtonFunction={() => { }}
                    />

                    <CustomButton label={"Login"} onPress={() => { }} />

                    <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                        Or, login with ...
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
                            <Text>G</Text>
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
                            <Text>F</Text>
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
                            <Text>T</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 16,
                        }}>
                        <Text>New to the app?</Text>
                        <TouchableOpacity
                            className="ml-1"
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Register</Text>
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
                            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Tạo tài khoản bán hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default LoginScreen;