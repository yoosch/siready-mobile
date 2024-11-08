import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const dummyData = [
  { semester: 1, total_sks: 7, courses: [{ kode:'PAIK6101', name: 'Dasar Pemrograman', class: 'D', time: 'Senin 08:00 - 10:00', sks: 4, semester : 1 }, { kode:'PAIK6102', name: 'Dasar Sistem', class: 'D', time: 'Senin 10:00 - 12:00', sks: 3, semester: 1 }] },
  { semester: 2, total_sks: 6, courses: [{ kode:'PAIK6203', name: 'Organisasi dan Arsitektur Komputer', class: 'D', time: 'Senin 09:00 - 11:00', sks: 3, semester: 2 }, { kode:'PAIK6205', name: 'Matematika II', class: 'B', time: 'Rabu 11:00 - 13:00', sks: 3, semester: 2 }] }
];

const IRSView = () => {
  const [expandedSemester, setExpandedSemester] = useState(null);

  const handleToggle = (semester) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  const renderCourse = (course) => (
    <View key={course.name} style={styles.courseContainer}>
      <Text style={styles.courseTextName}>{course.kode} - {course.name}</Text>
      <Text style={styles.courseTextClass}>Kelas {course.class}</Text>
      <Text style={styles.courseText}>{course.time}</Text>
      <Text style={styles.courseText}>Semester {course.semester}</Text>
      <Text style={styles.courseText}>{course.sks} SKS</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dummyData.map((item) => (
        <View key={item.semester} style={styles.semesterContainer}>
          <TouchableOpacity onPress={() => handleToggle(item.semester)} style={styles.semesterHeader}>
            <Text style={styles.semesterText}>Semester {item.semester}</Text>
            <Text style={styles.sksText}>{item.total_sks} SKS</Text>
          </TouchableOpacity>
          {expandedSemester === item.semester && (
            <View style={styles.coursesContainer}>
              {item.courses.map(renderCourse)}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212', // Dark background
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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
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
});

export default IRSView;
