import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

class Jobs extends React.Component {
  render() {
    return <View />;
  }
}

Jobs.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: () => <Icon name="suitcase" type="font-awesome" />,
};

export default Jobs;
