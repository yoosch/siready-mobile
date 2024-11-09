import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../config';
import axios from 'axios';

const ProfileScreen = () => {
    const [userName, setUserName] = useState('');
    const [nim, setNim] = useState('');
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
                <Text style={styles.value}>{userName}</Text>
                <Text style={styles.value}>{nim}</Text>

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
        backgroundColor: '#121212',
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
    },
    content: {
        alignItems: 'center', // Align items horizontally in the center
        justifyContent: 'center', // Align items vertically in the center
        padding: 20,
        width: '80%', // Set width to prevent elements from stretching across the entire screen
    },
    value: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 15,
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
