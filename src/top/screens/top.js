import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import Stories from 'common/components/stories';

import { fetchIds } from 'items/items.actions';
import { getStoriesOfType } from 'stories/stories.selectors';

const Top = ({ stories, fetchStories }) => (
  <Stories screenProps={{ stories, fetchStories }} />
);

Top.navigationOptions = {
  tabBarLabel: 'Top',
  tabBarIcon: () => <Icon name="chevron-up" type="font-awesome" />,
};

const mapStateToProps = state => ({
  stories: getStoriesOfType('top')(state),
});

const mapDispatchToProps = dispatch => ({
  fetchStories: () => {
    dispatch(fetchIds({ type: 'top' }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);
