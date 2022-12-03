import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Separator = () => <Text style={styles.metaText}> | </Text>;

const Headline = ({ _loading, title, by, score, descendants, viewDetails }) => {
  if (!_loading) {
    return (
      <TouchableOpacity onPress={viewDetails}>
        <View style={styles.container} onPress={viewDetails}>
          <Text style={styles.headlineText}>{title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{score} pts</Text>
            <Separator />
            <Text style={styles.metaText}>{descendants || 0} comments</Text>
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
        <Separator />
        <View style={styles.metaTextLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  headlineText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  loadingTitle: {
    backgroundColor: '#999999',
    height: 17,
    marginTop: 3,
    marginBottom: 3,
  },
  metaRow: {
    flex: 1,
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
