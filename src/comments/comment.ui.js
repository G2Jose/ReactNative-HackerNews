import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import HTML from 'react-native-render-html';

import CommentLoading from 'comments/comment.loading.ui';
import MetaRow from 'comments/metarow.ui';
import { getNumItems } from 'items/items.utils';
import { recursivelyCheckIfKidsChanged } from 'comments/comment.utils';

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

  shouldComponentUpdate(newProps, newState) {
    const oldProps = this.props;
    const oldState = this.state;
    if (
      oldProps._loading !== newProps._loading ||
      oldProps.text !== newProps.text ||
      oldProps.by !== newProps.by ||
      oldProps.kids !== newProps.kids ||
      oldProps.id !== newProps.id ||
      oldProps.fetchComment !== newProps.fetchComment ||
      (oldProps.items &&
        oldProps.id &&
        oldProps.items[oldProps.id] !== newProps.items[oldProps.id]) ||
      oldState !== newState ||
      oldProps._loaded !== newProps._loaded
    )
      return true;

    if (
      recursivelyCheckIfKidsChanged(
        newProps.kids,
        oldProps.items,
        newProps.items
      )
    )
      return true;
    return false;
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
            {text ? (
              <HTML
                html={text}
                onLinkPress={(_, href) => Linking.openURL(href)}
                baseFontStyle={{ fontSize: 14.5 }}
                tagsStyles={{
                  p: { marginTop: 5, marginBottom: 5 },
                }}
              />
            ) : (
              <Text />
            )}
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
