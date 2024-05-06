import React, { useState } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const AddDishes = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUri, setImageUri] = useState('');

    const handleSubmit = () => {
        // Handle the form submission here
    };

    const chooseImage = () => {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setImageUri(response.uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Dish Name"
                style={styles.input}
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Dish Description"
                style={styles.input}
                multiline={true}
                numberOfLines={4}
            />
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="Dish Price"
                style={styles.input}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.chooseImageButton} onPress={chooseImage}>
                <Text style={styles.chooseImageText}>Choose Image</Text>
            </TouchableOpacity>
            {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    chooseImageButton: {
        backgroundColor: '#00ffff',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    chooseImageText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#00ffff',
        paddingVertical: 15,
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default AddDishes;
