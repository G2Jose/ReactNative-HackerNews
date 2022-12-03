import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';

import Comment, { LoadingComment } from './comment.js';
import Card from './card.js';

const LoadingComments = () => {
	return (
		<View>
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
			<LoadingComment />
		</View>
	);
}

const Comments = ({item, loading}) => {
	if (loading)
		return <LoadingComments />;
	else if (item && item.comments) {
		return (
			<View>
				{item.comments.map((comment, i) => {
					return <Comment data={comment} key={i} />;
				})}
			</View>
		)
	}
	return <LoadingComments />;
}

export default Comments;
