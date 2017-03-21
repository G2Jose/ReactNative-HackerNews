import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';

const Card = ({ onPress, children }) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={0.8}
    style={styles.touchable}
  >
    <View style={styles.card}>
      {children}
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  touchable: {
    marginTop: 5,
    borderRadius: 5,
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 11,
    paddingLeft: 0,
    shadowColor: "#BFC0BF",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3
    },
     borderRadius: 5,
  },
});

export default Card;
