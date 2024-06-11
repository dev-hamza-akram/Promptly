import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReminderService from './services/ReminderService';

const Notifications = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = () => {
    ReminderService.getReminders(fetchedReminders => {
      setReminders(fetchedReminders);
    });
  };

  const deleteReminder = id => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            ReminderService.deleteReminder(id, () => {
              fetchReminders();
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderReminder = ({ item }) => (
    <View style={styles.reminderItem}>
      <Text style={styles.reminderTitle}>{item.title}</Text>
      <Text style={styles.reminderDescription}>{item.description}</Text>
      <Text style={styles.reminderDetails}>
        Date: {new Date(item.date).toLocaleString()}
      </Text>
      <Text style={styles.reminderDetails}>Repeat: {item.repeat}</Text>
      <Text style={styles.reminderDetails}>Priority: {item.priority}</Text>
      <Text style={styles.reminderDetails}>Category: {item.category}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ReminderEdit', { reminder: item })}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteReminder(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.gradient}>
      <FlatList
        contentContainerStyle={styles.container}
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={item => item.id.toString()}
      />
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Notifications;
