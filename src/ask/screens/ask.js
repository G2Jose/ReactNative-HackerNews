import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

class Ask extends React.Component {
  render() {
    return <View />;
  }
}

Ask.navigationOptions = {
  tabBarLabel: 'Ask',
  tabBarIcon: () => <Icon name="question" type="font-awesome" />,
};

export default Ask;
