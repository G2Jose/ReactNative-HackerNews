import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

import CommentLoading from 'comments/comment.loading.ui';
import MetaRow from 'comments/metarow.ui';
import { getNumItems } from 'items/items.utils';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    const { _loading, _loaded, fetchComment, id } = this.props;
    if (!_loading && !_loaded) {
      fetchComment(id);
    }
  }

  symbolToDisplay() {
    const numComments = getNumItems(this.props.kids);
    if (this.state && !this.state.expanded && numComments > 0) return '+';
    if (this.state && this.state.expanded && numComments > 0) return '-';
    return '';
  }

  handleExpand() {
    const numComments = getNumItems(this.props.kids);
    if (numComments > 0) this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      props: { _loading, text, by, kids, items, id, fetchComment },
      state: { expanded },
    } = this;
    const numComments = getNumItems(this.props.kids);
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
            {expanded &&
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
    paddingBottom: 7,
    paddingTop: 7,
    marginLeft: 15,
    marginRight: 0,
    borderWidth: 0,
    borderColor: '#d6d7da',
    borderBottomWidth: 0.5,
  },
  commentText: {
    fontSize: 15,
  },
  metaText: {
    color: 'grey',
  },
});

export default Comment;
