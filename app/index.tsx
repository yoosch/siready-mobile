// app/index.tsx
import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const navigation = useNavigation();

    const handleLogin = () => {
        // Navigate to the MainTabs stack, which contains the tab navigator
        navigation.navigate('(tabs)');
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
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    style={styles.input}
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
