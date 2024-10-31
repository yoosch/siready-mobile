import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

const RegistrationScreen = () => {
    const showAlert = (status: string) => {
        Alert.alert('Status Selected', `You have selected ${status}`);
    };

    return (
        <ScrollView style={styles.container}>

            {/* Alert Section */}
            {/* <View style={styles.alertBox}>
                <Text style={styles.alertTitle}>Error!</Text>
                <Text style={styles.alertMessage}>This is an error message.</Text>
            </View> */}

            {/* Page Title */}
            <View style={styles.containerTitle}>
                <Text style={styles.pageTitle}>Pilih Status Akademik</Text>
                <Text style={styles.pageSubtitle}>Silahkan pilih status akademik untuk semester ini</Text>
            </View>
            

            {/* Status Options */}
            <View style={styles.statusContainer}>
                {/* Active Option */}
                <View style={styles.statusBox}>
                    <View style={styles.statusContent}>
                    <Image
                      source={require('@/assets/images/aktif.png')}
                      style={styles.statusImage}
                    />
                        {/* <Image source={require('./assets/aktif.png')} style={styles.statusImage} /> */}
                        <Text style={styles.statusTitle}>Aktif</Text>
                    </View>
                    <Text style={styles.statusDescription}>
                        Anda akan mengikuti kegiatan perkuliahan pada semester ini serta mengisi Isian Rencana Studi (IRS).
                    </Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => showAlert('Aktif')}>
                        <Text style={styles.buttonText}>Pilih</Text>
                    </TouchableOpacity>
                </View>

                {/* Leave Option */}
                <View style={styles.statusBox}>
                    <View style={styles.statusContent}>
                        <Image source={require('@/assets/images/cuti.png')} style={styles.statusImage} />
                        <Text style={styles.statusTitle}>Cuti</Text>
                    </View>
                    <Text style={styles.statusDescription}>
                        Menghentikan kuliah sementara untuk semester ini tanpa kehilangan status sebagai mahasiswa Undip.
                    </Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => showAlert('Cuti')}>
                        <Text style={styles.buttonText}>Pilih</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: 'black' },
    navbar: { backgroundColor: '#333', paddingVertical: 10, marginBottom: 10 },
    navbarText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
    alertBox: {
        backgroundColor: '#FF5A5F',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    alertTitle: { color: '#fff', fontWeight: 'bold' },
    alertMessage: { color: '#fff', marginTop: 4 },
    containerTitle: { marginTop: 30, marginBottom: 20 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
    pageSubtitle: { color: '#fff', marginBottom: 16 },
    statusContainer: { flexDirection: 'column', justifyContent: 'space-between' },
    statusBox: {
        backgroundColor: '#1D2125',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    statusContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    statusImage: { width: 60, height: 60, marginRight: 10 },
    statusTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    statusDescription: { color: '#fff', fontSize: 14, marginBottom: 16 },
    selectButton: {
        backgroundColor: '#4a90e2',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
});

export default RegistrationScreen;
