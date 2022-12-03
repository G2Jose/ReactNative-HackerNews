import React from 'react';
import { View } from 'react-native';

import Comment, { LoadingComment } from './comment.js';

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
};

const Comments = ({item, loading}) => {
  if (loading)
    return <LoadingComments />;
  else if (item && item.comments) {
    return (
      <View>
        { item.comments.map((comment, i) => {
          return <Comment data={ comment } key={ i } />;
        }) }
      </View>
    );
  }
  return <LoadingComments />;
};

export default Comments;
