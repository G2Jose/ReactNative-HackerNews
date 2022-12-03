import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';

const Card = ({ onPress, children, bigShadow }) => {
  console.log('bigShadow', bigShadow);
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.touchable}
    >
      <View style={bigShadow ? StyleSheet.flatten([styles.card, {
        shadowOffset: {
          height: 4,
          width: 4,
        },
      }]) : styles.card}>
        {children}
      </View>
    </TouchableHighlight>
  );
}

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
    paddingLeft: 11,
    paddingRight: 11,
    paddingBottom: 5,
    paddingTop: 5,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
     borderRadius: 5,
  },
});

export default Card;
