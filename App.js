import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Headlines from './src/components/headlines.js';
import storiesStore from './src/store/stories.js';
import Story from './src/components/story.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'React Native Hacker News',
    header: {
      style: {
        backgroundColor: 'orange'
      },
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Headlines storiesStore={storiesStore} />
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
    backgroundColor: '#EFEFEF',
  },
  header: {
    backgroundColor: 'orange',
  }
});
