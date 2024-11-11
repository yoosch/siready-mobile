import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Lottie from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '../config';

const IRSView = () => {
  const [data, setData] = useState([]);
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalToastVisible, setIsModalToastVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}/api/view-irs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleToggle = (semester) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  const handleDeleteCourse = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        `${API_BASE_URL}/api/delete-irs`,
        { id: selectedCourse.id },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setModalMessage('Successfully deleted course');
      setIsModalToastVisible(true);
      setModalVisible(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((course) => (
        <View key={course.kode} style={styles.courseContainer}>
          <View style={styles.courseDetails}>
            <Text style={styles.courseText}>{course.posisi} / {course.kapasitas}</Text>
            <Text style={styles.courseTextName}>{course.kodemk} - {course.nama}</Text>
            <Text style={styles.courseTextClass}>Kelas {course.kelas.kelas}</Text>
            <Text style={styles.courseText}>{course.sks} SKS</Text>
          </View>
          <TouchableOpacity onPress={() => handleDeleteCourse(course)} style={styles.deleteButton}>
            <FontAwesome name="trash" size={20} color="#FF5555" />
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FontAwesome name="exclamation-triangle" size={40} color="#FF5555" />
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete {selectedCourse?.nama}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
      visible={isModalToastVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsModalToastVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
        <Lottie
          source={require('@/assets/animations/checklist.json')}
          autoPlay
          loop={false}
          style={styles.lottieAnimation}
        />
          <Text style={styles.modalTitle}>Success</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalToastVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black',
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  courseDetails: {
    flex: 1,
  },
  courseText: {
    fontSize: 13,
    color: '#fff',
  },
  courseTextName: {
    marginBottom: 3,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  courseTextClass: {
    marginBottom: 6,
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalMessage: {
    fontSize: 15,
    color: '#BBB',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  lottieAnimation: {
    width: 100,
    height: 100,
    marginBottom: 10,
},
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FF5555',
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default IRSView;
