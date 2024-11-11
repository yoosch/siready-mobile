import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '../config';

const dummyData = [
  { semester: 1, total_sks: 7, courses: [{ kode: 'PAIK6101', name: 'Dasar Pemrograman', class: 'D', time: 'Senin 08:00 - 10:00', sks: 4 }, { kode: 'PAIK6102', name: 'Dasar Sistem', class: 'D', time: 'Senin 10:00 - 12:00', sks: 3 }] },
  { semester: 2, total_sks: 6, courses: [{ kode: 'PAIK6203', name: 'Organisasi dan Arsitektur Komputer', class: 'D', time: 'Senin 09:00 - 11:00', sks: 3 }, { kode: 'PAIK6205', name: 'Matematika II', class: 'B', time: 'Rabu 11:00 - 13:00', sks: 3 }] }
];

const IRSView = () => {
  const [data, setData] = useState([]);
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

  console.log(data);

  const handleToggle = (semester) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  const handleDeleteCourse = async (course) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${course.nama}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const response = await axios.post(
                `${API_BASE_URL}/api/delete-irs`,
                { id :  course.id },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                }
              );

              console.log(response.data);
              //refresh screen
              setRefresh((prev) => !prev);

            } catch (error) {
              console.log('Error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((course) => (
       <View key={course.kode} style={styles.courseContainer}>
       <View style={styles.courseDetails}>
        {/* console.log('ini posisi' + course.posisi); */}
         <Text style={styles.courseText}>{course.posisi} / {course.kapasitas}</Text>
         <Text style={styles.courseTextName}>{course.kodemk} - {course.nama}</Text>
         <Text style={styles.courseTextClass}>Kelas {course.kelas.kelas}</Text>
         {/* <Text style={styles.courseText}>{course.time}</Text> */}
         <Text style={styles.courseText}>{course.sks} SKS</Text>
       </View>
       <TouchableOpacity onPress={() => handleDeleteCourse(course)} style={styles.deleteButton}>
         <FontAwesome name="trash" size={20} color="#FF5555" />
       </TouchableOpacity>
      </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
  },
  semesterContainer: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
  },
  semesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  semesterText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  sksText: {
    fontSize: 14,
    color: '#bbb',
  },
  coursesContainer: {
    marginTop: 10,
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
});

export default IRSView;
