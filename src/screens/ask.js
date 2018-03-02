import React from 'react';
import { Icon } from 'react-native-elements';

import Headlines from 'headlines/headlines.ui';
import { withStoryData } from 'stories/stories.utils';

const Ask = props => <Headlines screenProps={props} />;

Ask.navigationOptions = {
  tabBarLabel: 'Ask',
  tabBarIcon: () => <Icon name="question" type="font-awesome" />,
};

export default withStoryData(Ask, 'ask');
