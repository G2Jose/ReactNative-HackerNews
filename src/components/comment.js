import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import { loadingParams, createRepeatingFadeAnimation } from '../utils/animation.js';

import Comments from './comments.js';
import Card from './card.js';
import { removeHTML } from '../utils/string.js';

class LoadingComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }
  _animateLoading = () => {
    createRepeatingFadeAnimation(
      this.state.fadeAnim,
      loadingParams.iterationDuration,
      loadingParams.minOpacity, loadingParams.maxOpacity,
      loadingParams.iterations
    ).start();
  }
  componentDidMount() {
    this._animateLoading();
  }
  render() {
    return (
      <View style={ styles.comment }>
        <Card>
          <View style={ styles.commentContainer }>
            <Animated.View style={ StyleSheet.flatten([styles.loadingCommentText, {
              opacity: this.state.fadeAnim
            }]) } />
            <Animated.View style={ StyleSheet.flatten([styles.loadingCommentText, {
              opacity: this.state.fadeAnim
            }]) } />
            <Animated.View style={ StyleSheet.flatten([styles.loadingCommentText, {
              opacity: this.state.fadeAnim
            }]) } />
            <Animated.View style={ StyleSheet.flatten([styles.loadingCommentText, {
              opacity: this.state.fadeAnim
            }]) } />
            <View style={ styles.info }>
              <View style={ styles.loadingInfoContainer }>
                <Animated.View style={ StyleSheet.flatten([styles.loadingInfoText, {
                  opacity: this.state.fadeAnim
                }]) } />
              </View>
              <View style={ styles.loadingInfoContainer }>
                <Animated.View style={ StyleSheet.flatten([styles.loadingInfoText, {
                  opacity: this.state.fadeAnim
                }]) } />
              </View>
              <View style={ styles.loadingInfoContainer }>
                <Animated.View style={ StyleSheet.flatten([styles.loadingInfoText, {
                  opacity: this.state.fadeAnim
                }]) } />
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubcomments: false,
    };
  }

  render() {
    const {data} = this.props;
    return (
      <View style={ styles.comment }>
        <Card bigShadow={ data.comments && data.comments.length > 0 && !this.state.showSubcomments || false } onPress={ () => {
          this.setState({
            showSubcomments: !this.state.showSubcomments,
          });
        } }>
          <View style={ styles.commentContainer }>
            <Text style={ styles.commentText }>
              { removeHTML(data.content) }
            </Text>
            <View style={ styles.info }>
              <View style={ styles.infoContainer }>
                <Text style={ styles.infoText }>
                  { data.time_ago }
                </Text>
              </View>
              <View style={ styles.infoContainer }>
                <Text style={ styles.infoText }>
                  { data.user }
                </Text>
              </View>
              <View style={ styles.infoContainer }>
                <Text style={ styles.infoText }>
                  { `${data.comments.length} comments` }
                </Text>
              </View>
            </View>
          </View>
        </Card>
        { data.comments &&
          data.comments.length > 0 &&
          this.state.showSubcomments &&
          <Comments item={ data } /> }
      </View>
    );
  }
}

export { LoadingComment };
export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    flex: 1,
  },
  comment: {
    marginLeft: 4,
  // marginRight: 1,
  },
  commentText: {
    fontSize: 16,
  },
  loadingCommentText: {
    // flex: 1,
    height: 15,
    backgroundColor: 'grey',
    marginTop: 2,
    marginBottom: 2,
    opacity: 0.2,
  },
  loadingInfoText: {
    height: 15,
    backgroundColor: 'grey',
    marginTop: 2,
    marginBottom: 2,
    opacity: 0.2,
    marginLeft: 2,
    marginRight: 2,
  },
  info: {
    flexDirection: 'row',
    flex: 1,
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 7,
    paddingTop: 7,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
  },
  loadingInfoContainer: {
    flex: 1,
  },
});
