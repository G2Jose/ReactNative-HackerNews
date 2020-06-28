import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Headline from '~/headlines/headline.ui';
import Story from '~/stories/story.ui';
import { withStoryData } from '~/stories/stories.utils';

class HeadlinesBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, viewableItems: new Set() };
    this._onRefresh = this._onRefresh.bind(this);
    this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
    this.viewabilityConfig = {
      waitForInteraction: false,
      viewAreaCoveragePercentThreshold: 0.1,
    };
  }

  componentDidMount() {
    if (this.props.fetchHeadlineIds) this.props.fetchHeadlineIds();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    if (this.props.fetchHeadlineIds) this.props.fetchHeadlineIds();
    this.setState({ refreshing: false });
  }

  _onViewableItemsChanged({ viewableItems }) {
    this.setState({
      viewableItems: new Set(viewableItems.map((item) => item.index)),
    });
  }

  render() {
    const {
      props: {
        navigation: { navigate },
        stories,
        fetchItemForId,
      },
      state: { refreshing },
      _onRefresh,
    } = this;
    return (
      <View style={styles.stories}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
          data={stories}
          renderItem={({ item, index }) => (
            <View style={styles.headlineContainer}>
              <TouchableOpacity
                onPress={() => navigate('Details', { story: item })}
              >
                <Headline
                  {...item}
                  isViewable={this.state.viewableItems.has(index)}
                  fetchItemForId={fetchItemForId}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={this._onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
        />
      </View>
    );
  }
}

const Headlines = withStoryData(HeadlinesBase);
const Stack = createStackNavigator();

const HeadlinesStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Headlines} />
      <Stack.Screen name="Details" component={Story} />
    </Stack.Navigator>
  );
};

export default HeadlinesStack;

const styles = StyleSheet.create({
  stories: {
    backgroundColor: '#F6F6EF',
    paddingTop: 15,
  },
  headlineContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
