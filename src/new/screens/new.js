import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

const New = props => <Stories screenProps={props} />;

New.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: () => <Icon name="newspaper-o" type="font-awesome" />,
};

export default withStoryData(New, 'new');
