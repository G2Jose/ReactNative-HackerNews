import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import Stories from 'common/components/stories';

import { fetchShowStories } from 'show/show.actions';

const Show = props => <Stories screenProps={props} />;

Show.navigationOptions = {
  tabBarLabel: 'Show',
  tabBarIcon: () => <Icon name="tv" type="font-awesome" />,
};

const mapStateToProps = state => ({
  stories: state.showStories,
});

const mapDispatchToProps = dispatch => ({
  fetchStories: () => {
    dispatch(fetchShowStories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);
