import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

const Top = ({ stories, fetchStories }) => (
  <Stories screenProps={{ stories, fetchStories }} />
);

Top.navigationOptions = {
  tabBarLabel: 'Top',
  tabBarIcon: () => <Icon name="chevron-up" type="font-awesome" />,
};

export default withStoryData(Top, 'top');
