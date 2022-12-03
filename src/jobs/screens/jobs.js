import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

const Jobs = ({ stories, fetchStories }) => (
  <Stories screenProps={{ stories, fetchStories }} />
);

Jobs.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: () => <Icon name="suitcase" type="font-awesome" />,
};

export default withStoryData(Jobs, 'job');
