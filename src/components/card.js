import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';

const Card = ({ title, body, points }) => (
  <TouchableHighlight
    onPress={() => console.log('here')}
    activeOpacity={0.9}
  >
    <View style={styles.card}>
      <View style={styles.pointsContainer}>
        {points && <Text style={styles.points}>{points}</Text>}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        {body && <Text>{body}</Text>}
      </View>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 11,
    paddingLeft: 0,
    marginTop: 5,
    shadowColor: "#BFC0BF",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3
    },
    borderRadius: 5,
    // backgroundColor: '#FFA500',
  },
  cardContent: {
  	flex: 6,
  	flexDirection: 'column',
  },
  cardTitle: {
    fontFamily: 'Helvetica',
  	fontSize: 17,
    fontWeight: '400',
  	padding: 1,
  },
  pointsContainer: {
  	flex: 1,
  	flexDirection: 'column',
  	alignItems: 'center',
  }
});

export default Card;
