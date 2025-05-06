import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProviderHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Provider</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // по вертикали
    alignItems: 'center',      // по горизонтали
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
