import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import Stories from 'common/components/stories';

import { fetchNewStories } from 'new/new.actions';

const New = props => <Stories screenProps={props} />;

New.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: () => <Icon name="newspaper-o" type="font-awesome" />,
};

const mapStateToProps = state => ({
  stories: state.newStories,
});

const mapDispatchToProps = dispatch => ({
  fetchStories: () => {
    dispatch(fetchNewStories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(New);
