import React from 'react';
import { View, StyleSheet } from 'react-native';

import Separator from 'common/components/separator';
import { colors } from 'common/constants';

export default () => (
  <View style={styles.container}>
    <View style={styles.loadingComment} />
    <View style={styles.loadingComment} />
    <View style={styles.metaRow}>
      <View style={styles.metaTextLoadingShort} />
      <Separator />
      <View style={styles.metaTextLoading} />
      <Separator />
      <View style={styles.metaTextLoading} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 0,
    paddingBottom: 7,
    paddingTop: 7,
    borderWidth: 0,
    borderColor: '#d6d7da',
    borderBottomWidth: 0.5,
  },
  metaRow: {
    flex: 0,
    flexDirection: 'row',
  },
  metaTextLoading: {
    backgroundColor: '#999999',
    height: 17,
    width: 75,
  },
  metaTextLoadingShort: {
    backgroundColor: '#999999',
    height: 17,
    width: 15,
  },
  loadingComment: {
    backgroundColor: colors.loadingTextPlaceholder,
    height: 17,
    marginTop: 3,
    marginBottom: 3,
  },
});
