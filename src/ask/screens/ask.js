import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

const Ask = props => <Stories screenProps={props} />;

Ask.navigationOptions = {
  tabBarLabel: 'Ask',
  tabBarIcon: () => <Icon name="question" type="font-awesome" />,
};

export default withStoryData(Ask, 'ask');
