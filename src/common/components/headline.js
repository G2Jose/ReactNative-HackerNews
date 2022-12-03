import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Separator from 'common/components/separator';
import HeadlineLoading from 'common/components/headline.loading.ui';
import { colors } from 'common/constants';

class Headline extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.id &&
      nextProps.fetchItemForId &&
      !nextProps._loading &&
      !nextProps._loaded &&
      nextProps.isViewable
    ) {
      nextProps.fetchItemForId(nextProps.id);
    }
  }
  render() {
    const {
      _loaded,
      _loading,
      title,
      by,
      score,
      descendants,
      type,
    } = this.props;
    if (!_loading && _loaded) {
      return (
        <View style={styles.container}>
          <Text
            style={
              type === 'hyperlink' ? styles.hyperlinkText : styles.headlineText
            }
          >
            {title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{score} pts</Text>
            <Separator />
            <Text style={styles.metaText}>{descendants || 0} comments</Text>
            <Separator />
            <Text style={styles.metaText}>by {by}</Text>
          </View>
        </View>
      );
    }
    return <HeadlineLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0,
    borderColor: '#d6d7da',
    borderBottomWidth: 0.5,
  },
  headlineText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  hyperlinkText: {
    color: 'blue',
    fontSize: 17,
    fontWeight: 'bold',
  },
  metaRow: {
    flex: 0,
    flexDirection: 'row',
  },
  metaText: {
    color: 'grey',
  },
});

export default Headline;
