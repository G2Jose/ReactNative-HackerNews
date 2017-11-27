import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

import CommentLoading from 'comments/comment.loading.ui';
import MetaRow from 'comments/metarow.ui';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    if (!this.props._loading && !this.props._loaded) {
      this.props.fetchComment(this.props.id);
    }
  }

  numKids() {
    return (this.props.kids && this.props.kids.length) || 0;
  }

  symbolToDisplay() {
    if (!this.state.expanded && this.numKids() > 0) return '+';
    if (this.state.expanded && this.numKids() > 0) return '-';
    return '';
  }

  handleExpand() {
    if (this.numKids() > 0) this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { _loading, text, by, kids, items, id, fetchComment } = this.props;
    const numComments = this.numKids();
    if (!_loading) {
      return (
        <TouchableOpacity onPress={this.handleExpand.bind(this)}>
          <View style={styles.container}>
            {text ? <HTML html={text} /> : <Text />}
            <MetaRow
              numComments={numComments}
              expandSymbol={this.symbolToDisplay()}
              id={id}
              by={by}
            />
            {this.state.expanded &&
              kids &&
              kids.map(
                _id =>
                  items[_id] ? (
                    <Comment
                      {...items[_id]}
                      key={_id}
                      items={items}
                      fetchComment={fetchComment}
                    />
                  ) : (
                    <Comment
                      {...{ _loading: false, loaded: false, id: _id }}
                      key={_id}
                      fetchComment={fetchComment}
                      items={items}
                    />
                  )
              )}
          </View>
        </TouchableOpacity>
      );
    }
    return <CommentLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 12,
    marginRight: 10,
  },
  commentText: {
    fontSize: 15,
  },
  metaText: {
    color: 'grey',
  },
});

export default Comment;
