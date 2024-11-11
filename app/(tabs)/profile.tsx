import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../config';
import axios from 'axios';

const ProfileScreen = () => {
    const [userName, setUserName] = useState('');
    const [nim, setNim] = useState('');
    const [prodi, setProdi] = useState('');
    const navigation = useNavigation();

    // Function to fetch user data from an API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');

                const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                const { data } = result;
                
                // Update state with the fetched data
                setUserName(data.nama);
                setNim(data.nim);
                setProdi(data.prodi);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/logout`,
                {},
                { headers: { Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}` } }
            );

            // Clear token from AsyncStorage
            await AsyncStorage.removeItem('userToken');
            navigation.reset({ index: 0, routes: [{ name: 'index' }] });
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Logout failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.statusImage}
            />
                <Text style={styles.valueName}>{userName}</Text>
                <Text style={styles.valueNim}>{nim}</Text>
                <Text style={styles.valueProdi}>Fakultas Sains dan Matematika</Text>
                <Text style={styles.valueProdi}>{prodi} S1</Text>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
    },
    content: {
        alignItems: 'center', // Align items horizontally in the center
        justifyContent: 'center', // Align items vertically in the center
        padding: 20,
        width: '100%', // Set width to prevent elements from stretching across the entire screen
    },
    statusImage: { width: 100, height: 100, marginRight: 10, marginBottom: 20 },
    valueName: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center', // Center text horizontally
    },
    valueNim: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'medium',
        marginBottom: 20,
        textAlign: 'center', // Center text horizontally
    },
    valueProdi: {
        fontSize: 19,
        color: '#FFF',
        fontWeight: 'thin',
        marginBottom: 2,
        textAlign: 'center', // Center text horizontally
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#E53E3E',  // Red background for the logout button
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6, // For Android shadow effect
    },
    logoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
