import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// import { Divider } from 'react-native-elements';
import { XMarkIcon } from 'react-native-heroicons/outline';
const AddressesScreen = ({ navigation }) => {
    const listAddresses = [{ id: 1, name: 'Nguyen Van A', phone: '+8412345678' }, { id: 2, name: 'Nguyen Van B', phone: '+8412345678' }, { id: 3, name: 'Nguyen Van C', phone: '+8412345678' }]
    const [addresses, setAddresses] = React.useState(listAddresses); // replace this with actual data
    console.log(addresses);
    const renderItem = ({ item }) => (
        <View className='relative'>
            <View className='absolute top-0 right-0 z-20'>
                <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                    <XMarkIcon size={40} color="#F05D40" />
                </TouchableOpacity>
            </View>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text>{item.phone}</Text>

            <View style={styles.line} />
        </View>
    );

    const deleteAddress = (id) => {
        const newAddresses = addresses.filter(address => address.id !== id);
        setAddresses(newAddresses);
    };

    return (
        <View className='bg-white flex-1'>
            <FlatList
                data={addresses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Button title="Add Address" onPress={() => navigation.navigate('AddAddress')} />
        </View>
    );
};
const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: 'grey',
        marginVertical: 10,
    },
});
export default AddressesScreen;