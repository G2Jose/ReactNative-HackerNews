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
					}])} />
					<Animated.View style={StyleSheet.flatten([styles.loadingTitle, {
						opacity: this.state.fadeAnim
					}])} />
					<View style={styles.info}>
						<View style={styles.loadingInfoContainer}><Animated.View style={StyleSheet.flatten([styles.loadingInfoText, {opacity: this.state.fadeAnim}])} /></View>
						<View style={styles.loadingInfoContainer}><Animated.View style={StyleSheet.flatten([styles.loadingInfoText, {opacity: this.state.fadeAnim}])} /></View>
						<View style={styles.loadingInfoContainer}><Animated.View style={StyleSheet.flatten([styles.loadingInfoText, {opacity: this.state.fadeAnim}])} /></View>
					</View>
				</View>
			</Card>
		);
	}
}

const Headline = ({ loading, title, body, points, onPress, timeAgo, commentCount, author }) => {
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
				<View style={styles.info}>
					<View style={styles.infoContainer}><Text style={styles.infoText}>{timeAgo}</Text></View>
					<View style={styles.infoContainer}><Text style={styles.infoText}>{`${commentCount} comments`}</Text></View>
					<View style={styles.infoContainer}><Text style={styles.infoText}>{author}</Text></View>
				</View>
			</View>
		</Card>
	);
}

export default Headline;


const styles = StyleSheet.create({
  info: {
	flexDirection: 'row',
	flex: 1,
	borderTopColor: 'grey',
	borderTopWidth: StyleSheet.hairlineWidth,
	marginTop: 3,
	paddingTop: 3,
  },
  infoContainer: {
	flex: 1,
	alignItems: 'center',
  },
  loadingInfoContainer: {
	flex: 1,
  },
  infoText: {
	fontSize: 14,
  },
  loadingInfoText: {
	height: 15,
	backgroundColor: 'grey',
	margin: 2,
	opacity: 0.2,
  },
  content: {
  	flex: 6,
  	flexDirection: 'column',
  },
  title: {
  	fontSize: 17,
    fontWeight: '400',
  	padding: 1,
  },
  pointsContainer: {
  	flex: 1,
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
		flex: 1,
	},
});
