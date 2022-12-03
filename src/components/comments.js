import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';

import Card from './card.js';

const Comment = ({data}) => {
	return (
		<View style={styles.comment}>
			<Card>
				<View style={styles.commentContainer}>
					<Text style={styles.commentText}>
						{data.content}
					</Text>
				</View>
			</Card>
			{
				data.comments && data.comments.length > 0 && <Comments item={data} />
			}
		</View>
	)
}

const Comments = ({item}) => {
	if (item && item.comments) {
		return (
			<View>
				{item.comments.map((comment, i) => {
					return <Comment data={comment} key={i} />;
				})}
			</View>
		)
	} else {
		return <Text>Loading...</Text>
	}
}

export default Comments;

const styles = StyleSheet.create({
  commentContainer: {
  	paddingTop: 1,
	paddingBottom: 1,
	paddingLeft: 11,
	paddingRight: 11,
	
  },
  comment: {
	marginLeft: 4,
  },
  commentText: {
	fontFamily: 'Helvetica',
	fontSize: 16,
  }
});
