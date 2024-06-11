import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './src/Navigation';

const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
