import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const BuatIrsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedClasses, setSelectedClasses] = useState({
    aljabar_linear: '',
    organisasi_arsitektur: '',
  });

  const handleSelectClass = (courseKey, className) => {
    setSelectedClasses(prevState => ({ ...prevState, [courseKey]: className }));
  };

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

      {/* Aljabar Linear */}
      <View style={styles.courseCard}>
        <Text style={styles.courseName}>Aljabar Linear - PAIK6204 (3 SKS)</Text>
        <RadioButton.Group
          onValueChange={value => handleSelectClass('aljabar_linear', value)}
          value={selectedClasses.aljabar_linear}
        >
          <View style={styles.classRow}>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('aljabar_linear', 'A')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="A" color="#3B82F6" status={selectedClasses.aljabar_linear === 'A' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>A</Text>
                  <Text style={styles.classTime}>Senin, 13:00 - 15:00</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('aljabar_linear', 'B')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="B" color="#3B82F6" status={selectedClasses.aljabar_linear === 'B' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>B</Text>
                  <Text style={styles.classTime}>Selasa, 09:00 - 11:00</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.classRow}>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('aljabar_linear', 'C')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="C" color="#3B82F6" status={selectedClasses.aljabar_linear === 'C' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>C</Text>
                  <Text style={styles.classTime}>Rabu, 08:00 - 10:00</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('aljabar_linear', 'D')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="D" color="#3B82F6" status={selectedClasses.aljabar_linear === 'D' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>D</Text>
                  <Text style={styles.classTime}>Kamis, 14:00 - 16:00</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </RadioButton.Group>
      </View>

      {/* Organisasi dan Arsitektur Komputer */}
      <View style={styles.courseCard}>
        <Text style={styles.courseName}>Matematika II - PAIK6202 (3 SKS)</Text>
        <RadioButton.Group
          onValueChange={value => handleSelectClass('organisasi_arsitektur', value)}
          value={selectedClasses.organisasi_arsitektur}
        >
          <View style={styles.classRow}>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('organisasi_arsitektur', 'A')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="A" color="#3B82F6" status={selectedClasses.organisasi_arsitektur === 'A' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>A</Text>
                  <Text style={styles.classTime}>Senin, 10:00 - 12:00</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('organisasi_arsitektur', 'B')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="B" color="#3B82F6" status={selectedClasses.organisasi_arsitektur === 'B' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>B</Text>
                  <Text style={styles.classTime}>Selasa, 13:00 - 15:00</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.classRow}>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('organisasi_arsitektur', 'C')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="C" color="#3B82F6" status={selectedClasses.organisasi_arsitektur === 'C' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>C</Text>
                  <Text style={styles.classTime}>Rabu, 15:00 - 17:00</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.classContainer}
              onPress={() => handleSelectClass('organisasi_arsitektur', 'D')}
            >
              <View style={styles.radioOption}>
                <RadioButton value="D" color="#3B82F6" status={selectedClasses.organisasi_arsitektur === 'D' ? 'checked' : 'unchecked'} />
                <View>
                  <Text style={styles.radioLabel}>D</Text>
                  <Text style={styles.classTime}>Kamis, 09:00 - 11:00</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </RadioButton.Group>
      </View>

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
