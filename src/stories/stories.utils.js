import React from 'react';
import { connect } from 'react-redux';

import { fetchIds } from 'stories/stories.actions';
import { getStoriesOfType } from 'stories/stories.selectors';

export const withStoryData = (Component, type = 'top') => {
  const WithStoryData = ({ fetchStories, stories, ...rest }) => (
    <Component stories={stories} fetchStories={fetchStories} {...rest} />
  );

  const mapStateToProps = state => ({
    stories: getStoriesOfType(type)(state),
  });

  const mapDispatchToProps = dispatch => ({
    fetchStories: () => {
      dispatch(fetchIds({ type }));
    },
  });

  WithStoryData.navigationOptions = Component.navigationOptions;

  return connect(mapStateToProps, mapDispatchToProps)(WithStoryData);
};
