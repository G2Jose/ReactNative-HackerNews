import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

const Jobs = props => <Stories screenProps={props} />;

Jobs.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: () => <Icon name="suitcase" type="font-awesome" />,
};

export default withStoryData(Jobs, 'job');
