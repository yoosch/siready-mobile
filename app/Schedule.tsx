import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const TaskListApp = () => {
  const screenWidth = Dimensions.get('window').width;
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('userToken');

        // Make the API request with the token in the Authorization header
        const response = await fetch(`${API_BASE_URL}/api/jadwal`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log(result);
        setScheduleData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [selectedDay, setSelectedDay] = useState('1');

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'black' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View>
          <Text style={{ color: '#B3B3B3', fontSize: 14 }}>November 2024</Text>
          <Text style={{ color: '#76A9FA', fontWeight: 'bold', fontSize: 16 }}>TODAY</Text>
        </View>
        <FontAwesome name="bell" size={24} color="#757575" />
      </View>

      {/* Horizontal Scrollable Calendar Days */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20, marginTop: 25 }}>
        {Array.from({ length: 31 }, (_, index) => (index + 1).toString()).map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayPress(day)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 60,
              borderRadius: 8,
              marginHorizontal: 4,
              backgroundColor: day === selectedDay ? '#3d71d8' : '#333333',
            }}>
            <Text style={{ color: day === selectedDay ? '#fff' : '#B3B3B3', fontSize: 12 }}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][new Date(2024, 10, day).getDay()]}
            </Text>
            <Text style={{ fontWeight: 'bold', color: day === selectedDay ? '#fff' : '#B3B3B3', fontSize: 16 }}>
              {day}
            </Text>
            {day === selectedDay && (
              <View style={{ width: 6, height: 6, backgroundColor: '#66BB6A', borderRadius: 3, marginTop: 4 }} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Task List */}
      <ScrollView>
        {(scheduleData[selectedDay] || []).map((task, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={{ width: 8, height: 8, backgroundColor: '#3d71d8', borderRadius: 4, left: 0 }} />
            <View
              style={{
                width: screenWidth - 64,
                padding: 16,
                borderRadius: 8,
                backgroundColor: task.label === 'green' ? '#3d71d8' : '#3d71d8',
                marginLeft: 24,
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>{task.name}</Text>
                <Text style={{ color: '#B3B3B3', fontSize: 12 }}>{task.time}</Text>
              </View>
              <Text style={{ color: '#B3B3B3' }}>{task.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TaskListApp;
