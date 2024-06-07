import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import ReminderService from './services/ReminderService';

const ReminderCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [repeat, setRepeat] = useState('None');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Custom');

  useEffect(() => {
    ReminderService.createTable();
  }, []);

  const saveReminder = () => {
    ReminderService.saveReminder(
      title,
      description,
      date,
      repeat,
      priority,
      category,
    );
    // Optionally clear the form or navigate to another screen
  };

  const showMode = currentMode => {
    setShowDatePicker(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor="#B0C4DE"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          placeholderTextColor="#B0C4DE"
        />

        <Text style={styles.label}>Date and Time</Text>
        <TouchableOpacity
          style={styles.dateTimeTextContainer}
          onPress={() => showMode('date')}>
          <Text style={styles.dateTimeText}>
            Select Date: {date.toDateString()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dateTimeTextContainer}
          onPress={() => showMode('time')}>
          <Text style={styles.dateTimeText}>
            Select Time: {date.toTimeString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.label}>Repeat</Text>
        <RNPickerSelect
          onValueChange={value => setRepeat(value)}
          items={[
            {label: 'None', value: 'None'},
            {label: 'Daily', value: 'Daily'},
            {label: 'Weekly', value: 'Weekly'},
            {label: 'Monthly', value: 'Monthly'},
            {label: 'Custom', value: 'Custom'},
          ]}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Priority</Text>
        <RNPickerSelect
          onValueChange={value => setPriority(value)}
          items={[
            {label: 'Low', value: 'Low'},
            {label: 'Medium', value: 'Medium'},
            {label: 'High', value: 'High'},
          ]}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Category</Text>
        <RNPickerSelect
          onValueChange={value => setCategory(value)}
          items={[
            {label: 'Custom', value: 'Custom'},
            {label: 'Medicine', value: 'Medicine'},
            {label: 'Education', value: 'Education'},
            // Add more categories here
          ]}
          style={pickerSelectStyles}
        />

        <TouchableOpacity style={styles.button} onPress={saveReminder}>
          <Text style={styles.buttonText}>Save Reminder</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
 gradient: {
   flex: 1,
 },
 container: {
   padding: 20,
 },
 label: {
   fontSize: 18,
   fontWeight: 'bold',
   color: '#FFFFFF',
   marginBottom: 10,
 },
 input: {
   height: 50,
   borderColor: '#1E90FF',
   borderWidth: 1,
   borderRadius: 10,
   marginBottom: 20,
   paddingLeft: 15,
   color: '#FFFFFF',
   backgroundColor: 'rgba(255, 255, 255, 0.1)',
 },
 dateTimeTextContainer: {
   height: 50,
   marginBottom: 20,
   borderColor: '#1E90FF',
   borderWidth: 1,
   borderRadius: 10,
   backgroundColor: 'rgba(255, 255, 255, 0.1)',
   justifyContent: 'center',
 },
 dateTimeText: {
   color: '#FFFFFF',
   textAlign: 'center',
   textAlignVertical: 'center',
   height: '100%',
 },
 button: {
   backgroundColor: '#FF6347',
   padding: 15,
   borderRadius: 10,
   alignItems: 'center',
   marginTop: 20,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 5,
 },
 buttonText: {
   color: 'white',
   fontSize: 18,
   fontWeight: 'bold',
 },
});

const pickerSelectStyles = StyleSheet.create({
 inputIOS: {
   fontSize: 16,
   paddingVertical: 12,
   paddingHorizontal: 10,
   borderWidth: 1,
   borderColor: '#1E90FF',
   borderRadius: 10,
   color: 'white',
   paddingRight: 30,
   backgroundColor: 'rgba(255, 255, 255, 0.1)',
   marginBottom: 20,
 },
 inputAndroid: {
   fontSize: 16,
   paddingHorizontal: 10,
   paddingVertical: 8,
   borderWidth: 1,
   borderColor: '#1E90FF',
   borderRadius: 10,
   color: 'white',
   paddingRight: 30,
   backgroundColor: 'rgba(255, 255, 255, 0.1)',
   marginBottom: 20,
 },
});

export default ReminderCreation;
