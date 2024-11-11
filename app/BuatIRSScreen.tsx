import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const BuatIrsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedClasses, setSelectedClasses] = useState({});
  const [conflictedClasses, setConflictedClasses] = useState([]); // Track conflicting classes
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}/api/buat-irs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setCourses(result.data);
        setSelectedClasses(result.selectedClass);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const extractTimeRange = (timeRange) => {
    const [start, end] = timeRange.split('-').map(t => t.trim());
    return { startTime: start, endTime: end };
  };

  const checkConflict = (selectedCourse, selectedClass) => {
    const selectedDay = selectedClass.hari;
    const { startTime: selectedStart, endTime: selectedEnd } = extractTimeRange(selectedClass.jam);

    const conflicts = [];

    for (const [courseKey, classId] of Object.entries(selectedClasses)) {
      if (courseKey === selectedCourse) continue;

      const conflictingClass = courses
        .find(course => course.kodemk === courseKey)
        .kelas.find(cls => cls.id === classId);

      if (conflictingClass.hari === selectedDay) {
        const { startTime, endTime } = extractTimeRange(conflictingClass.jam);
        if ((startTime < selectedEnd && startTime >= selectedStart) ||
            (selectedStart < endTime && selectedStart >= startTime)) {
          conflicts.push(classId); // Add conflict
        }
      }
    }
    setConflictedClasses(conflicts); // Update conflicted classes
    return conflicts.length > 0;
  };

  const handleSelectClass = async (courseKey, classId) => {
    const selectedClass = courses
      .find(course => course.kodemk === courseKey)
      .kelas.find(cls => cls.id === classId);
  
    if (checkConflict(courseKey, selectedClass)) {
      setModalMessage('This class conflicts with another selected class.');
      setIsModalVisible(true);
      return;
    }
  
    setSelectedClasses(prevState => ({ ...prevState, [courseKey]: classId }));
  
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        `${API_BASE_URL}/api/buat-irs`,
        { kodemk: courseKey, kodejadwal: classId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
          <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
        <Lottie
          source={require('@/assets/animations/warning.json')}
          autoPlay
          loop={false}
          style={styles.lottieAnimation}
        />
          <Text style={styles.modalTitle}>Conflict</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#7C7C7C"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('DetailIRSScreen')} style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Detail IRS</Text>
        </TouchableOpacity>
      </View>

      {courses.filter(course => course.matakuliah.toLowerCase().includes(searchText.toLowerCase())).map(course => (
        <View key={course.kodemk} style={styles.courseCard}>
          <Text style={styles.courseName}>{`${course.matakuliah} - ${course.kodemk} (${course.sks} SKS)`}</Text>
          <RadioButton.Group
            onValueChange={value => handleSelectClass(course.kodemk, value)}
            value={selectedClasses[course.kodemk] || ''}
          >
            {course.kelas.reduce((rows, classItem, index) => {
              if (index % 2 === 0) rows.push(course.kelas.slice(index, index + 2));
              return rows;
            }, []).map((classPair, rowIndex) => (
              <View key={rowIndex} style={styles.classRow}>
                {classPair.map(classItem => (
                  <TouchableOpacity
                    key={classItem.id}
                    style={[
                      styles.classContainer,
                      conflictedClasses.includes(classItem.id) && styles.conflictBackground,
                    ]}
                    onPress={() => handleSelectClass(course.kodemk, classItem.id)}
                  >
                    <View style={styles.radioOption}>
                      <RadioButton
                        value={classItem.id}
                        color="#3B82F6"
                        status={selectedClasses[course.kodemk] === classItem.id ? 'checked' : 'unchecked'}
                      />
                      <View>
                        <Text style={styles.radioLabel}>{classItem.kelas}</Text>
                        <Text style={styles.classTime}>{`${classItem.hari}, ${classItem.jam}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </RadioButton.Group>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '50%', // Half-width search bar
  },
  searchInput: {
    color: '#FFF',
    flex: 1,
    fontSize: 16,
  },
  detailButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  detailButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  conflict: { backgroundColor: '#E71B1B' }, // Red background for conflicting classes
  courseCard: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    marginBottom: 10,
  },
  classRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 10,
    flex: 0.48,
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  classTime: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
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
});

export default BuatIrsScreen;
