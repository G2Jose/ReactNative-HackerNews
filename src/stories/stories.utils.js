import React from 'react';
import { connect } from 'react-redux';

import { fetchItem } from 'items/items.actions';
import { fetchHeadlineIds } from 'headlines/headlines.actions';
import { getStoriesOfType } from 'stories/stories.selectors';

export const withStoryData = (Component, type = 'top') => {
  const WithStoryData = props => <Component {...props} />;

  const mapStateToProps = state => ({
    stories: getStoriesOfType(type)(state),
  });

  const mapDispatchToProps = dispatch => ({
    fetchHeadlineIds: () => {
      dispatch(fetchHeadlineIds({ type }));
    },
    fetchItemForId: id => {
      dispatch(fetchItem({ id }));
    },
  });

  WithStoryData.navigationOptions = Component.navigationOptions;

  return connect(mapStateToProps, mapDispatchToProps)(WithStoryData);
};
