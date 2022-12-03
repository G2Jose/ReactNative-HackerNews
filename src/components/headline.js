import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';

import Card from './card.js';

const Headline = ({ title, body, points, onPress }) => {
	return (
		<Card onPress={onPress}>
			<View style={styles.pointsContainer}>
				{points && <Text style={styles.points}>{points}</Text>}
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				{body && <Text>{body}</Text>}
			</View>
		</Card>
	);
}

export default Headline;


const styles = StyleSheet.create({
  content: {
  	flex: 6,
  	flexDirection: 'column',
  },
  title: {
    fontFamily: 'Helvetica',
  	fontSize: 17,
    fontWeight: '400',
  	padding: 1,
  },
  pointsContainer: {
  	flex: 1,
  	flexDirection: 'column',
  	alignItems: 'center',
  },
  points: {
    fontWeight: 'bold',
  }
});
