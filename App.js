import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReminderCreation from './src/ReminderCreation';

const App = () => {
  return (
    <View style={styles.container}>
      <ReminderCreation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
