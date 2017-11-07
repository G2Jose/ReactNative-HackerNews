import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import Stories from 'common/components/stories';

import { fetchTopStories } from 'top/top.actions';

const Top = ({ stories, fetchStories }) => (
  <Stories screenProps={{ stories, fetchStories }} />
);

Top.navigationOptions = {
  tabBarLabel: 'Top',
  tabBarIcon: () => <Icon name="chevron-up" type="font-awesome" />,
};

const mapStateToProps = state => ({
  stories: state.topStories,
});

const mapDispatchToProps = dispatch => ({
  fetchStories: () => {
    dispatch(fetchTopStories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);
