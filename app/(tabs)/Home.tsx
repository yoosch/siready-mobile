import React, { useEffect,useState, } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StatusBar, BackHandler, ToastAndroid, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app'; // Import exit app functionality
import "../../global.css";

const Home = () => {
  useEffect(() => {
    // Show the status bar when this screen is mounted
    StatusBar.setHidden(false); // Or use <StatusBar hidden={false} />
  }, []);

    const navigation = useNavigation();
    const [isIpkHidden, setIsIpkHidden] = useState(false);
    const [ipkValue, setIpkValue] = useState(null);
    const [sksValue, setSksValue] = useState(null);
    const [userName, setUserName] = useState('');

    // Function to fetch user data from an API
    useEffect(() => {
        const fetchData = async () => {
            try {

              const token = await AsyncStorage.getItem('userToken');

                const response = await fetch('http://192.168.1.29:8000/api/dashboard', {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                });
                const result = await response.json();
                const { data } = result;
                console.log(data);
                
                // Update state with the fetched data
                setUserName(data.nama);
                setIpkValue(data.ipk);
                setSksValue(data.sks);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    // const [backPressCount, setBackPressCount] = useState(0);

    // useEffect(() => {
    //     const handleBackPress = () => {
    //         if (backPressCount === 1) {
    //             // Show a prompt or Toast message asking the user to close manually
    //             if (Platform.OS === 'android') {
    //                 ToastAndroid.show('Press back again to close', ToastAndroid.SHORT);
    //             }
    //             // Reset the counter after a short delay
    //             setTimeout(() => setBackPressCount(0), 2000);
    //             return true;
    //         } else {
    //             setBackPressCount(1);
    //             return true;
    //         }
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         handleBackPress
    //     );

    //     return () => backHandler.remove();
    // }, [backPressCount]);

    // Dummy data for the schedule
    const schedule = [
        { course: 'Pengembangan Berbasis Platform', room: 'A1', time: '09:00 - 10:30' },
        { course: 'Pembelajaran Mesin', room: 'B2', time: '15:40 - 18:10' },
    ];
    const menuItems = [
        { title: 'Registrasi', screen: 'Registrasi', icon: 'app-registration' },
        { title: 'Buat IRS', screen: 'Buat IRS', icon: 'playlist-add' },
        { title: 'IRS', screen: 'IRSScreen', icon: 'subject' },
        { title: 'KHS', screen: 'KHSScreen', icon: 'summarize' },
        { title: 'Jadwal', screen: 'Schedule', icon: 'calendar-today' },
        { title: 'Transkrip', screen: 'TranskripScreen', icon: 'assignment' },
    ];

    return (
        <ScrollView className="flex-1 pt-[10%] px-4 bg-black">
            {/* Welcome Text */}
            <Text className="text-2xl font-bold text-white mb-6">Welcome, {userName} 👋</Text>

            {/* Status and IPK Cards */}
            <View className="flex-row justify-between mb-6">
        {/* Aktif Card */}
        <View className="flex-1 rounded-lg overflow-hidden mx-1">
          <LinearGradient
            colors={['#31C48D', '#0E9F6E', '#057A55']} // Green gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="items-center p-4"
          >
            <Text className="text-2xl font-bold text-white">Aktif</Text>
            <Text className="text-white">Status</Text>
          </LinearGradient>
        </View>

        {/* IPK Card */}
        <View className="flex-1 rounded-lg overflow-hidden mx-1">
          <LinearGradient
            colors={['#FACA15', '#E3A008', '#C27803']} // Yellow gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="items-center p-4"
          >
            <TouchableOpacity onPress={() => setIsIpkHidden(!isIpkHidden)}>
              <Text className="text-2xl font-bold text-white">{isIpkHidden ? '***' : (ipkValue !== null ? ipkValue.toFixed(2) : 'Loading...')}</Text>
              <Text className="text-white">IPK</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* SKS Card */}
        <View className="flex-1 rounded-lg overflow-hidden mx-1">
          <LinearGradient
            colors={['#76A9FA', '#1C64F2', '#1E429F']} // Blue gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="items-center p-4"
          >
            <Text className="text-2xl font-bold text-white">120</Text>
            <Text className="text-white">SKS</Text>
          </LinearGradient>
        </View>
      </View>

            {/* Current Semester Information */}
            <View className="flex-row justify-between mx-1">
                <View className="flex-1 items-center bg-gray-800 mr-1 p-4 rounded-lg mb-6">
                    <Text className="text-white font-bold">Semester Studi</Text>
                    <Text className="text-white text-xl font-bold">9</Text>
                </View>
                <View className="flex-1 items-center bg-gray-800 ml-1 p-4 rounded-lg mb-6">
                    <Text className="text-white font-bold">IP Semester</Text>
                    <Text className="text-white text-xl font-bold">2.3</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View className="flex-row flex-wrap justify-between mb-6">
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        className="w-[31.3%] aspect-square bg-gray-800 m-1 rounded-lg justify-center items-center"
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <MaterialIcons name={item.icon} size={28} color="#00aced" />
                        <Text className="text-center text-white mt-2">{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Today's Schedule */}
            <Text className="text-xl font-bold text-white mb-4">Today's Schedule</Text>
            <FlatList
                data={schedule}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row justify-between bg-gray-800 p-4 rounded-lg mb-2">
                        <Text className="text-white">{item.course}</Text>
                        <Text className="text-gray-400">{item.time}</Text>
                    </View>
                )}
            />
        </ScrollView>
    );
};

export default Home;

