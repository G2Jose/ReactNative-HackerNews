import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

const Show = ({ stories, fetchStories }) => (
  <Stories screenProps={{ stories, fetchStories }} />
);

Show.navigationOptions = {
  tabBarLabel: 'Show',
  tabBarIcon: () => <Icon name="tv" type="font-awesome" />,
};

export default withStoryData(Show, 'show');
