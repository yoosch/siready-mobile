import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './(tabs)/index'; // Adjust the path
import Registrasi from './Registrasi'; // Adjust the path
// Import other screens...

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Registrasi" component={Registrasi} />
                {/* Add other screens here */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
