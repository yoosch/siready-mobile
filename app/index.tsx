// app/index.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.1.4:8000/api/login', {
                email,
                password,
            });

            console.log(response.data);

            if (response.data.access_token) {
                // Save the token in AsyncStorage
                await AsyncStorage.setItem('userToken', response.data.access_token);

                // Set the default header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

                // Navigate to the MainTabs stack
                navigation.navigate('(tabs)');
            } else {
                Alert.alert('Login failed', 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred. Please check your credentials or try again later.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo or Icon */}
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} />

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Log in to your account</Text>
                <Text style={styles.subtitle}>Enter your credentials to access your account</Text>
                
                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login to your account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 170,
        backgroundColor: 'black', // dark background
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    formContainer: {
        backgroundColor: '#374250', // dark form background
        padding: 20,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: '600',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#9CA3AE',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#2E2E2E',
        color: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LoginScreen;
