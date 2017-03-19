import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, body, points }) => (
	<View style={styles.card}>
		<View style={styles.pointsContainer}>
			{points && <Text style={styles.points}>{points}</Text>}
		</View>
		<View style={styles.cardContent}>
			<Text style={styles.cardTitle}>{title}</Text>
			{body && <Text>{body}</Text>}
		</View>
	</View>
)

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 0,
    margin: 2,
    marginLeft: 4,
    marginRight: 4,
    shadowColor: "#BFC0BF",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  cardContent: {
  	flex: 6,
  	flexDirection: 'column',
  },
  cardTitle: {
  	fontSize: 16,
  	padding: 1,
  },
  pointsContainer: {
  	flex: 1,
  	flexDirection: 'column',
  	alignItems: 'center',
  }
});

export default Card;
