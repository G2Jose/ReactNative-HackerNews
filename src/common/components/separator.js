import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default () => <Text style={styles.separator}> | </Text>;

const styles = StyleSheet.create({
  separator: {
    color: 'grey',
  },
});
