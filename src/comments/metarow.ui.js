import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Separator from 'common/components/separator';

export default ({ numComments, expandSymbol, id, by }) => (
  <View style={styles.metaRow}>
    {numComments > 0 && [
      <Text style={styles.metaText} key={`symbol-key-${id}`}>
        {expandSymbol}
      </Text>,
      <Separator key={`separator-key-${id}`} />,
    ]}
    <Text style={styles.metaText}>
      {numComments} {numComments === 1 ? 'comment' : 'comments'}
    </Text>
    <Separator />
    <Text style={styles.metaText}>by {by}</Text>
  </View>
);

const styles = StyleSheet.create({
  metaRow: {
    flex: 0,
    flexDirection: 'row',
  },
  metaText: {
    color: 'grey',
  },
});
