import React from 'react';
import { View, StyleSheet } from 'react-native';

import { backgroundColor } from 'common/constants';
import Headline from 'common/components/headline';

class Story extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.headlineContainer}>
        <Headline {...data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headlineContainer: {
    backgroundColor,
    flex: 1,
  },
});

Story.navigationOptions = {
  headerStyle: {
    backgroundColor,
  },
};

export default Story;
