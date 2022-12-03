import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import hnapi from './src/utils/api.js';

import Headlines from './src/components/headlines.js';
import Navbar from './src/components/navbar.js';

import storiesStore from './src/store/stories.js';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {
    hnapi.getTopStories().then(response => storiesStore.updateStories(response.data));
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar title="React Native Hacker News" />
        <Headlines storiesStore={storiesStore} />
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
});

console.log(SimpleApp);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
});
