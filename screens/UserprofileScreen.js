import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, BuildingStorefrontIcon, Cog6ToothIcon, CurrencyDollarIcon, GifIcon, GiftIcon, MapPinIcon, PowerIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';

const UserprofileScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setUser(null));
        navigation.navigate('Login');
    }
    return (
        <>
            <SafeAreaView className="bg-white ">

                <View className='container bg-white h-full '>

                    <View className='p-5 bg-white '>
                        <View className="relative">
                            <TouchableOpacity

                                onPress={() => navigation.goBack(null)}
                            >
                                <ArrowLeftIcon size={22} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row items-center py-5' >
                            <Image
                                source={{
                                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
                                }}
                                className=" h-24 w-24 rounded-full mb-4"
                            />
                            <View>
                                <Text className='text-xl font-bold text-gray-800 mb-2'>John Doe</Text>
                                <Text className='text-sm text-gray-400 bg-opacity-25'>Software Engineer</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { }} style={{ marginTop: 20, flexDirection: 'row' }} >
                            <GiftIcon size={30} color="gray" />
                            <Text className='text-black-700  font-light text-xl'>Ưu Đãi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={{ marginTop: 25, flexDirection: 'row' }}>
                            <CurrencyDollarIcon size={30} color="gray" />
                            <Text className='text-black-700  font-light text-xl' >Xu tích lũy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={{ marginTop: 25, flexDirection: 'row' }}>
                            <Cog6ToothIcon size={30} color="gray" />
                            <Text className='text-black-700  font-light text-xl'>Cài đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity clasName='py-12' onPress={() => { }} style={{ marginTop: 25, flexDirection: 'row' }} >
                            <BuildingStorefrontIcon size={30} color="gray" />
                            <Text className='text-black-700  font-light text-xl'>Cửa hàng của bạn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 25, flexDirection: 'row' }} onPress={() => { }}>
                            <MapPinIcon size={30} color="gray" />
                            <Text className='text-black-700  font-light text-xl'>Địa chỉ</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 25, flexDirection: 'row' }} onPress={() => { }}>
                            <QuestionMarkCircleIcon size={30} color="gray" />
                            <Text className='text-black-700  font-light text-xl'>Trợ giúp</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#00CCBB',

                                flexDirection: 'row', marginTop: '50%',
                                width: 130,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                            }}
                            onPress={handleLogout}>
                            <PowerIcon size={30} color="gray" />
                            <Text className='text-white text-xl '>Đăng xuất</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView >
        </>
    );
};
export default UserprofileScreen;