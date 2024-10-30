import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Icon } from '@rneui/themed';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';


// type DashboardNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
    const navigation = useNavigation();
    const [isIpkHidden, setIsIpkHidden] = useState(false);
    const [ipkValue] = useState(3.75); // Dummy IPK value
    const userName = 'Tom Lembong'; // Dummy user name

    // Dummy data for the schedule
    const schedule = [
        { course: 'Pengembangan Berbasis Platform', room: 'A1', time: '09:00 - 10:30' },
        { course: 'Pembelajaran Mesin', room: 'B2', time: '15:40 - 18:10' },
    ];
    const menuItems = [
      { title: 'Registrasi', screen: 'Registrasi' },
      { title: 'Buat IRS', screen: 'Buat IRS' },
      { title: 'IRS', screen: 'IRSScreen' }, // Create this screen
      { title: 'KHS', screen: 'KHSScreen' }, // Create this screen
      { title: 'Jadwal', screen: 'JadwalScreen' }, // Create this screen
      { title: 'Transkrip', screen: 'TranskripScreen' }, // Create this screen
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Welcome Text */}
            <Text style={styles.title}>Welcome, {userName} 👋</Text>

            {/* Status and IPK cards */}
            <View style={styles.cardsContainer}>
                <View style={[styles.card, styles.greenCard]}>
                    <Text style={styles.cardTitle}>Aktif</Text>
                    <Text style={styles.cardText}>Status</Text>
                </View>

                <View style={[styles.card, styles.yellowCard]}>
                    <TouchableOpacity onPress={() => setIsIpkHidden(!isIpkHidden)}>
                        <Text style={styles.cardTitle}>
                            {isIpkHidden ? '***' : ipkValue.toFixed(2)}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.cardText}>IPK</Text>
                </View>

                <View style={[styles.card, styles.blueCard]}>
                    <Text style={styles.cardTitle}>120</Text>
                    <Text style={styles.cardText}>SKS</Text>
                </View>
            </View>

            {/* Academic Information */}
            {/* <Text style={styles.centerText}><Text style={styles.boldText}>Pembimbing Akademik:</Text> H. Prabowo Subianto</Text>
            <Text style={styles.centerText}><Text style={styles.boldText}>NIP:</Text> 24060122110001</Text> */}

            {/* Current Semester Information */}
            <View style={styles.semesterInfo}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoText}>Semester Studi</Text>
                    <Text style={styles.infoValue}>5</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoText}>IP Semester</Text>
                    <Text style={styles.infoValue}>2.3</Text>
                </View>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('Registrasi')}
                >
                    <Icon name='app-registration' color='#00aced' />
                    <Text style={styles.menuText}>Registrasi</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('Buat IRS')}
                >
                    <Icon name='playlist-add' color='#00aced' />
                    <Text style={styles.menuText}>Buat IRS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('IRSScreen')}
                >
                    <Icon name='subject' color='#00aced' />
                    <Text style={styles.menuText}>IRS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('KHSScreen')}
                >
                    <Icon name='summarize' color='#00aced' />
                    <Text style={styles.menuText}>KHS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('JadwalScreen')}
                >
                    <Icon name='calendar-today' color='#00aced' />
                    <Text style={styles.menuText}>Jadwal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('TranskripScreen')}
                >
                    <Icon name='assignment' color='#00aced' />
                    <Text style={styles.menuText}>Transkrip</Text>
                </TouchableOpacity>
            </View>
            {/* Schedule */}
            <View style={styles.scheduleContainer}>
                <Text style={styles.subtitle}>Today's Schedule</Text>
                <FlatList
                    data={schedule}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.scheduleItem}>
                            <Text style={styles.scheduleText}>{item.course}</Text>
                            <Text style={styles.scheduleText}>{item.time}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40, paddingHorizontal: 10, backgroundColor: 'black' },
    title: { fontSize: 24, fontWeight: 'bold', marginLeft: 12, marginBottom: 16, color: 'white' },
    cardsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    card: { flex: 1, padding: 16, borderRadius: 12, marginHorizontal: 8, alignItems: 'center' },
    greenCard: { backgroundColor: '#4caf50' },
    yellowCard: { backgroundColor: 'orange' },
    blueCard: { backgroundColor: '#2196f3' },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
    cardText: { color: 'white' },
    centerText: { textAlign: 'center', marginTop: 8, color: 'white' },
    boldText: { fontWeight: 'bold', color: 'white' },
    semesterInfo: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:8, padding: 8 },
    infoItem: { flex: 1, alignItems: 'center', padding: 8, marginHorizontal: 8, borderRadius: 8, backgroundColor: '#1D2125' },
    infoText: { color: 'white', fontWeight: 'bold' },
    infoValue: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    scheduleContainer: {  },
    subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, marginLeft:12, color: 'white' },
    scheduleItem: { flexDirection: 'row', justifyContent: 'space-between',marginHorizontal:8, padding: 15, backgroundColor: '#1D2125', marginVertical: 5, borderRadius: 8 },
    scheduleText: { color: 'white' },
    menuContainer: {
      marginTop: 30,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between', // Space between items
      margin: 10,
    },
    menuItem: {
        width: '30%', // Each item takes 30% of the container's width
        aspectRatio: 1, // Makes the items square
        backgroundColor: '#1D2125', // Example background color
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5, // Space between items
        borderRadius: 5, // Optional: for rounded corners
        padding: 10,
    },
    menuText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    },
    icon: {
      width: 24,
      height: 24,
    },
      announcementContainer: { marginTop: 16, padding: 16, backgroundColor: '#1D2125', borderRadius: 12 },
      announcementText: { color: 'white' }
});

export default Dashboard;
