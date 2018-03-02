import React from 'react';
import { Icon } from 'react-native-elements';

import Headlines from 'headlines/headlines.ui';
import { withStoryData } from 'stories/stories.utils';

const New = props => <Headlines screenProps={props} />;

New.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: () => <Icon name="newspaper-o" type="font-awesome" />,
};

export default withStoryData(New, 'new');
