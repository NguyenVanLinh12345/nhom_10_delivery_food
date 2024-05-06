import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
const AddVoucher = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const handleSubmit = () => {
        // Handle the form submission here
    };
    console.log('name', name, 'description', description, 'expiryDate', expiryDate, 'discountAmount', discountAmount)
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tên Voucher </Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="nhập tên voucher"
            />
            <Text style={styles.label}>Số tiền giảm</Text>
            <TextInput
                style={styles.input}
                placeholder="vnđ"
                keyboardType="numeric"
                value={discountAmount}
                onChangeText={setDiscountAmount}
            />

            <Text style={styles.label}>Mô tả</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                placeholder="Nhập để mô tả chi tiết"
            />

            <Text style={styles.label}>Ngày hết hạn</Text>
            <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="DD/MM/YYYY"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#00ffff',
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default AddVoucher;
