import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button, Animated } from 'react-native';

import {loadingParams, createRepeatingFadeAnimation} from '../utils/animation.js';
import Card from './card.js';

class LoadingHeadline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0),
		};
	}
	_animateLoading = () => {
		createRepeatingFadeAnimation(
			this.state.fadeAnim,
			loadingParams.iterationDuration,
			loadingParams.minOpacity, loadingParams.maxOpacity,
			loadingParams.iterations
		).start();
	}
	componentDidMount() {
		this._animateLoading();
	}
	render() {
		return (
			<Card >
				<View style={styles.loadingPointsContainer}>
					<Animated.View style={StyleSheet.flatten([styles.loadingPoints, {
						opacity: this.state.fadeAnim
					}])}>
					</Animated.View>
				</View>
				<View style={styles.content}>
					<Animated.View style={StyleSheet.flatten([styles.loadingTitle, {
						opacity: this.state.fadeAnim
					}])}>
					</Animated.View>
					<Animated.View style={StyleSheet.flatten([styles.loadingTitle, {
						opacity: this.state.fadeAnim
					}])}>
					</Animated.View>
				</View>
			</Card>
		);
	}
}

const Headline = ({ loading, title, body, points, onPress }) => {
	if (loading)
		return <LoadingHeadline />;
	return (
		<Card onPress={onPress}>
			<View style={styles.pointsContainer}>
				<Text style={styles.points}>{points || '0'}</Text>
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
  },
	loadingPointsContainer: {
		flex: 1,
  	flexDirection: 'column',
	},
	loadingPoints: {
		height: 20,
		backgroundColor: 'grey',
		marginLeft: 10,
		marginRight: 10,
		opacity: 0.2,
	},
	loadingTitle: {
		height: 15,
		backgroundColor: 'grey',
		margin: 2,
		opacity: 0.2,
	},
});
