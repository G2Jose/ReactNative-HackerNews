import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button, Linking } from 'react-native';

import Comments from './comments.js';
import Card from './card.js';
import { removeHTML } from '../utils/string.js';

class Comment extends React.Component {
	constructor() {
		super();
		this.state = {
			showSubcomments: true,
		};
	}

	render() {
		const { data } = this.props;
		return (
			<View style={styles.comment}>
				<Card
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

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
  	paddingTop: 1,
	paddingBottom: 1,
	paddingLeft: 11,
	paddingRight: 11,
	
  },
  comment: {
	marginLeft: 3,
	marginRight: 3,
  },
  commentText: {
	fontFamily: 'Helvetica',
	fontSize: 16,
  }
});
