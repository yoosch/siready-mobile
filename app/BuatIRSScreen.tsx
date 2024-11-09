import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '../config';

const BuatIrsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedClasses, setSelectedClasses] = useState({});
  const [courses, setCourses] = useState([]);

  // Function to fetch data from the API
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
            console.log(result);
            console.log(result.data);
            
            // Update state with the fetched data
            setCourses(result.data);
            setSelectedClasses(result.selectedClass);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchData();
}, []);

  console.log('ini coruse');
  console.log(courses);

  const handleSelectClass = (courseKey, className) => {
    setSelectedClasses(prevState => ({ ...prevState, [courseKey]: className }));
  };

  console.log('ini selectedClasses');
  console.log(selectedClasses);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#7C7C7C"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Icon name="search" size={18} color="#7C7C7C" style={styles.searchIcon} />
        </View>
      </View>

      {/* Render courses dynamically */}
      {courses.filter(course => course.matakuliah.toLowerCase().includes(searchText.toLowerCase())).map(course => (
      <View key={course.kodemk} style={styles.courseCard}>
        <Text style={styles.courseName}>{`${course.matakuliah} - ${course.kodemk} (${course.sks} SKS)`}</Text>
        <RadioButton.Group
          onValueChange={value => handleSelectClass(course.kodemk, value)}
          value={selectedClasses[course.kodemk] || ''}
        >
          {course.kelas.map(classItem => (
            <TouchableOpacity
              key={classItem.id}
              style={styles.classContainer}
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
  },
  searchInput: {
    color: '#FFF',
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 5,
  },
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
    textAlign: 'center'
  },
  classTime: {
    color: '#AAA',
    fontSize: 12, // Smaller text for time
    marginTop: 2,
  },
});

export default BuatIrsScreen;
