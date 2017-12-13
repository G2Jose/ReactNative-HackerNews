import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Headline from 'common/components/headline';
import Story from 'stories/story.ui';
import {
  mapScreenPropsToProps,
  mapNavigationStateParamsToProps,
} from 'common/navigation';

class Headlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
  }
  componentDidMount() {
    this.props.fetchStories();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.fetchStories();
    this.setState({ refreshing: false });
  }

  render() {
    const {
      props: { navigation: { navigate }, stories },
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
          renderItem={({ item }) => (
            <View style={styles.headlineContainer}>
              <TouchableOpacity
                onPress={() => navigate('Details', { story: item })}
              >
                <Headline {...item} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

Headlines.navigationOptions = {
  header: null,
};

const Stories = StackNavigator(
  {
    Home: {
      screen: mapScreenPropsToProps(Headlines),
      header: null,
    },
    Details: {
      screen: mapNavigationStateParamsToProps(Story),
    },
  },
  { initialRouteName: 'Home', headerMode: 'screen' }
);

export default Stories;

const styles = StyleSheet.create({
  stories: {
    backgroundColor: '#F6F6EF',
  },
  headlineContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
