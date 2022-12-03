import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Headlines from './src/components/headlines.js';
import storiesStore from './src/store/stories.js';
import Story from './src/components/story.js';

import { navigationOptions } from './src/utils/navigation.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'React Native Hacker News',
    ...navigationOptions,
  };
  
  navigateToStory = (id) => {
    const { navigate } = this.props.navigation;
    navigate('Story', { id });
  }
  render() {
    
    return (
      <View style={styles.container}>
        <Headlines storiesStore={storiesStore} navigateToStory={this.navigateToStory} />
      </View>
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Story: { screen: Story },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
