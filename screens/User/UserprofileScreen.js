import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, BuildingStorefrontIcon, Cog6ToothIcon, CurrencyDollarIcon, GifIcon, GiftIcon, MapPinIcon, PowerIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import CustomButton from '../../components/CustomButton';
const UserprofileScreen = ({ route, navigation }) => {
    return (
        <>
            <SafeAreaView className="bg-white  ">

                <View className=' bg-slate-200 h-full '>

                    <View className=''>

                        <View className='flex-1 bg-white'>
                            <View className="relative">
                                <TouchableOpacity
                                    className='p-5'
                                    onPress={() => navigation.goBack(null)}
                                >
                                    <ArrowLeftIcon size={22} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row items-center p-5 ' >
                                <Image
                                    source={{
                                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
                                    }}
                                    className=" h-20 w-20 rounded-full mb-4"
                                />
                                <View>
                                    <Text className='text-xl font-bold text-gray-800 mb-2'>John Doe</Text>
                                    <Text className='text-sm text-gray-400 bg-opacity-25'>Software Engineer</Text>
                                </View>
                            </View>
                        </View>
                        <View className='mt-10'>
                            <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} >
                                <GiftIcon size={30} color="black" />
                                <Text className='text-black text-lg font-medium ml-2'>Ưu Đãi</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-10 h-10 '>
                            <TouchableOpacity onPress={() => { navigation.navigate('CoinScreen') }} style={{ flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                                <CurrencyDollarIcon size={30} color="black" />
                                <Text className='text-black text-lg font-medium ml-2' >Xu tích lũy</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-10 h-10 '>
                            <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                                <Cog6ToothIcon size={30} color="black" />
                                <Text className='text-black text-lg font-medium ml-2'>Cài đặt</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-10 h-10 '>
                            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onPress={() => { navigation.navigate('Addresses') }}>
                                <MapPinIcon size={30} color="black" />
                                <Text className='text-black text-lg font-medium ml-2' >Địa chỉ</Text>

                            </TouchableOpacity>
                        </View>
                        <View className='mt-10 h-10 '>
                            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onPress={() => { }}>
                                <QuestionMarkCircleIcon size={30} color="black" />
                                <Text className='text-black text-lg font-medium ml-2'>Trợ giúp</Text>

                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => { }}
                            style={{
                                backgroundColor: '#00CCBB',

                                flexDirection: 'row', marginTop: 25,
                                width: 130,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                            }}>
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