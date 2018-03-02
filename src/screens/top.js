import React from 'react';
import { Icon } from 'react-native-elements';

import Headlines from 'headlines/headlines.ui';
import { withStoryData } from 'stories/stories.utils';

const Top = props => <Headlines screenProps={props} />;

Top.navigationOptions = {
  tabBarLabel: 'Top',
  tabBarIcon: () => <Icon name="chevron-up" type="font-awesome" />,
};

export default withStoryData(Top, 'top');
