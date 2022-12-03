import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Separator from 'common/components/separator';

import { colors } from 'common/constants';

const Headline = ({ _loading, title, by, score, descendants, type }) => {
  if (!_loading) {
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
  return (
    <View style={styles.container}>
      <View style={styles.loadingTitle} />
      <View style={styles.loadingTitle} />
      <View style={styles.metaRow}>
        <View style={styles.metaTextLoading} />
        <Separator />
        <View style={styles.metaTextLoading} />
        <Separator />
        <View style={styles.metaTextLoading} />
      </View>
    </View>
  );
};

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
  loadingTitle: {
    backgroundColor: colors.loadingTextPlaceholder,
    height: 17,
    marginTop: 3,
    marginBottom: 3,
  },
  metaRow: {
    flex: 0,
    flexDirection: 'row',
  },
  metaText: {
    color: 'grey',
  },
  metaTextLoading: {
    backgroundColor: '#999999',
    height: 17,
    width: 75,
  },
});

export default Headline;
