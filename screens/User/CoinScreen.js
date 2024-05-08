import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CoinScreen = () => {
    const [coins, setCoins] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ZaloPay Coins</Text>
            <View style={styles.coinContainer}>
                <Image source={{ uri: 'https://t3.ftcdn.net/jpg/01/94/67/20/360_F_194672016_pf5HYgLlm6XlSwuL7JE4Pqvdq0RFqK7V.jpg' }} style={styles.coinIcon} />
                <Text style={styles.coinText}>{coins}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0ecee3',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    coinIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    coinText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CoinScreen;