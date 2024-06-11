import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReminderService from './services/ReminderService';

const ReminderDashboard = ({navigation}) => {
  const [reminders, setReminders] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, [date]);

  const fetchReminders = () => {
    ReminderService.getReminders(fetchedReminders => {
      setReminders(
        fetchedReminders.filter(
          reminder =>
            new Date(reminder.date).toDateString() === date.toDateString(),
        ),
      );
    });
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const renderReminder = ({item}) => (
    <View style={styles.reminderItem}>
      <Text style={styles.reminderTitle}>{item.title}</Text>
      <Text style={styles.reminderDescription}>{item.description}</Text>
      <Text style={styles.reminderDetails}>
        Date: {new Date(item.date).toLocaleString()}
      </Text>
      <Text style={styles.reminderDetails}>Repeat: {item.repeat}</Text>
      <Text style={styles.reminderDetails}>Priority: {item.priority}</Text>
      <Text style={styles.reminderDetails}>Category: {item.category}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={showDatePickerHandler}>
          <Text style={styles.dateTimeText}>
            Select Date: {date.toDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <FlatList
          data={reminders}
          renderItem={renderReminder}
          keyExtractor={item => item.id.toString()}
        />
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
  dateTimeText: {
    height: 50,
    marginBottom: 20,
    paddingLeft: 15,
    color: '#FFFFFF',
    textAlignVertical: 'center',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
  },
  reminderItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#1E90FF',
    borderWidth: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reminderDescription: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  reminderDetails: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default ReminderDashboard;
