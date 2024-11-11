import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import { ColorSpace } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const { width } = Dimensions.get('window');

const RegistrationScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');

    const showAlert = (status) => {
        setSelectedStatus(status);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    //try to fetch data from API using axios https://fakestoreapi.com/products/ and call it

    const handleStatusSelection = async (status) => {

        const token = await AsyncStorage.getItem('userToken');

        try {
            const response = await axios.post(`${API_BASE_URL}/api/register`, {
                status: status,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                showAlert(status);
                console.log(response.data);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const tryAxios = async () => {
    //     try {
    //         const response = await axios.post('http://10.137.150.30:8000/api/register', {
    //             status: 'Aktif',
    //             email: 'bobby@gmail.com', // Add email to the request body
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (response.status === 200) {
    //             console.log(response.data);
    //         } else {
    //             console.error(response);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // tryAxios();

    

    return (
        <ScrollView style={styles.container}>
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
                        <Text style={styles.statusTitle}>Aktif</Text>
                    </View>
                    <Text style={styles.statusDescription}>
                        Anda akan mengikuti kegiatan perkuliahan pada semester ini serta mengisi Isian Rencana Studi (IRS).
                    </Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => handleStatusSelection('Aktif')}>
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
                    <TouchableOpacity style={styles.selectButton} onPress={() => handleStatusSelection('Non Aktif')}>
                        <Text style={styles.buttonText}>Pilih</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Custom Success Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Lottie
                            source={require('@/assets/animations/checklist.json')}
                            autoPlay
                            loop={false}
                            style={styles.lottieAnimation}
                        />
                        <Text style={styles.modalText}>Status {selectedStatus} berhasil dipilih!</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: 'black' },
    containerTitle: { marginTop: 30, marginBottom: 20 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
    pageSubtitle: { color: '#aaa', marginBottom: 16 },
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
    statusDescription: { color: '#ddd', fontSize: 14, marginBottom: 16 },
    selectButton: {
        backgroundColor: '#3d71d8',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        width: width * 0.8,
        padding: 20,
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    lottieAnimation: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'tomato',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default RegistrationScreen;
