import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button, Linking, Animated } from 'react-native';

import {loadingParams, createRepeatingFadeAnimation} from '../utils/animation.js';

import Comments from './comments.js';
import Card from './card.js';
import { removeHTML } from '../utils/string.js';

class LoadingComment extends React.Component {
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
			<View style={styles.comment}>
				<Card>
					<View style={styles.commentContainer}>
						<Animated.View style={StyleSheet.flatten([styles.loadingCommentText, {
							opacity: this.state.fadeAnim
						}])} />
						<Animated.View style={StyleSheet.flatten([styles.loadingCommentText, {
							opacity: this.state.fadeAnim
						}])} />
						<Animated.View style={StyleSheet.flatten([styles.loadingCommentText, {
							opacity: this.state.fadeAnim
						}])} />
						<Animated.View style={StyleSheet.flatten([styles.loadingCommentText, {
							opacity: this.state.fadeAnim
						}])} />
					</View>
				</Card>
			</View>
		);
	}
}

class Comment extends React.Component {
	constructor() {
		super();
		this.state = {
			showSubcomments: false,
		};
	}

	render() {
		const { data } = this.props;
		return (
			<View style={styles.comment}>
				<Card
					bigShadow={data.comments && data.comments.length > 0 && !this.state.showSubcomments || false}
					onPress={() => {
						this.setState({
							showSubcomments: !this.state.showSubcomments,	
						})
					}
				}>
					<View style={styles.commentContainer}>
						<Text style={styles.commentText}>
							{removeHTML(data.content)}
						</Text>
					</View>
				</Card>
				{
					data.comments &&
					data.comments.length > 0 &&
					this.state.showSubcomments &&
					<Comments item={data} />
				}
			</View>
		)
	}
}

export { LoadingComment };
export default Comment;

const styles = StyleSheet.create({
	commentContainer: {
		paddingTop: 1,
		paddingBottom: 1,
		paddingLeft: 11,
		paddingRight: 1,
		flex: 1,
	},
	comment: {
		marginLeft: 4,
		// marginRight: 1,
	},
	commentText: {
		fontFamily: 'Helvetica',
		fontSize: 16,
	},
	loadingCommentText: {
		// flex: 1,
		height: 15,
		backgroundColor: 'grey',
		marginTop: 2,
		marginBottom: 2,
		opacity: 0.2,
	}
});
