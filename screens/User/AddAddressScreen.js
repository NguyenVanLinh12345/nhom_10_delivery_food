import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import InputField from '../../components/InputField';
import { MapIcon, MapPinIcon, PhoneIcon, UserIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { validationPhoneNumber, validation } from '../../sanity/schemas/validation';

const AddAddressScreen = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const checkValidation = validation(name) && validationPhoneNumber(phone) && validation(address);
    console.log('checkValidation', checkValidation)

    return (
        <View className='bg-gray-100 flex-1'>
            <View className='py-5 '>
                <Text >Liên hệ</Text>
            </View>
            <View></View>
            <InputField
                label={'bí danh'}
                icon={
                    <UserIcon
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                }
                inputType={'text'}
                onChange={value => {
                    setErrorName(validation(value) == true ? '' : 'Tên không được để trống');
                    setName(value);
                }}
            />
            <View>
                <Text style={{ color: 'red' }}>{errorName}</Text>
            </View>
            <InputField
                label={'Số điện thoại'}
                icon={<PhoneIcon
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                />}
                keyboardType={'numeric'}
                onChange={value => {
                    setErrorPhone(validationPhoneNumber(value) == true ? '' : 'so dien thoai khong hop le');
                    setPhone(value)
                }}
            />
            <View className=''>
                <Text style={{ color: 'red' }}>{errorPhone}</Text>
            </View>
            <View className='py-5 '>
                <Text >Địa chỉ</Text>
            </View>
            <InputField
                label={'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
                icon={<MapPinIcon
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                />}
                inputType={'text'}
            />
            <InputField
                label={'Địa chỉ cụ thể'}
                icon={<MapIcon
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                />}
                inputType={'text'}
                onChange={value => {
                    setAddress(value)
                    setErrorAddress(validation(value) == true ? '' : 'Dia chi khong duoc de trong');
                }
                }
            />
            <View>
                <Text style={{ color: 'red' }}>{errorAddress}</Text>
            </View>
            <View className='py-5 '>
                <Text>Cài đặt</Text>
                <View className='h-0.5 bg-gray-200 my-2'></View>
                <View className='flex-row items-center justify-between py-2 '>
                    <Text className='left-3 font-semibold'>Đặt làm địa chỉ mặc định</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#9bebe1" }}
                        thumbColor={isEnabled ? "#0ecee3" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />

                </View>
                <View className='h-0.5 bg-gray-200 my-2'></View>
            </View>

            <View>
                <TouchableOpacity
                    style={{ backgroundColor: '#0ecee3', padding: 10, alignItems: 'center', borderRadius: 5 }}
                    onPress={() => {
                        checkValidation ?
                            (
                                Alert.alert('Thông báo', 'Bạn đã tạo địa chỉ thành công'),
                                navigation.navigate('Addresses')
                            )

                            : Alert.alert('Thông báo', 'Xin vui lòng điền đầy đủ thông tin')
                    }}>
                    <Text style={{ color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}
export default AddAddressScreen;