import React from 'react';
import { Icon } from 'react-native-elements';

import Headlines from 'headlines/headlines.ui';
import { withStoryData } from 'stories/stories.utils';

const Jobs = props => <Headlines screenProps={props} />;

Jobs.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: () => <Icon name="suitcase" type="font-awesome" />,
};

export default withStoryData(Jobs, 'job');
