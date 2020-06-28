import React from 'react';
import { Icon } from 'react-native-elements';

import Headlines from '~/headlines/headlines.ui';
import { withStoryData } from '~/stories/stories.utils';

const Show = (props) => <Headlines screenProps={props} />;

Show.navigationOptions = {
  tabBarLabel: 'Show',
  tabBarIcon: () => <Icon name="tv" type="font-awesome" />,
};

export default withStoryData(Show, 'show');
