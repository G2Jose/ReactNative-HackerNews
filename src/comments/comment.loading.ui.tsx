import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

import Separator from '~/common/components/separator';
import { colors } from '~/common/constants';

class CommentLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fadeAnim: new Animated.Value(0.5) };
  }

  componentDidMount() {
    this.animateLoading();
  }

  animateLoading() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.back(),
      useNativeDriver: true,
    }).start(() => {
      this.setState({ fadeAnim: new Animated.Value(0.5) }, () =>
        this.animateLoading()
      );
    });
  }

  render() {
    const { fadeAnim } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.loadingComment, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.loadingComment, { opacity: fadeAnim }]} />
        <View style={styles.metaRow}>
          <Animated.View
            style={[styles.metaTextLoadingShort, { opacity: fadeAnim }]}
          />
          <Separator />
          <Animated.View
            style={[styles.metaTextLoading, { opacity: fadeAnim }]}
          />
          <Separator />
          <Animated.View
            style={[styles.metaTextLoading, { opacity: fadeAnim }]}
          />
        </View>
      </View>
    );
  }
}

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

export default CommentLoading;
