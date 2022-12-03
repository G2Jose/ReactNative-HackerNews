import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Separator = () => <Text style={styles.metaText}> | </Text>;

const Comment = props => {
  const { _loading, text, by, kids } = props;
  const numComments = (kids && kids.length) || 0;
  if (!_loading) {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.headlineText}>{text}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {numComments} {numComments === 1 ? 'comment' : 'comments'}
            </Text>
            <Separator />
            <Text style={styles.metaText}>by {by}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  headlineText: {
    fontSize: 15,
  },
  loadingTitle: {
    backgroundColor: '#999999',
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

export default Comment;
