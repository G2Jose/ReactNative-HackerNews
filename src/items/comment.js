import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

const Separator = () => <Text style={styles.metaText}> | </Text>;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    if (!this.props._loading && !this.props._loaded) {
      this.props.fetchItemForId(this.props.id);
    }
  }

  render() {
    const { _loading, text, by, kids, items } = this.props;
    const numComments = (kids && kids.length) || 0;
    if (!_loading) {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ expanded: !this.state.expanded })}
        >
          <View style={styles.container}>
            {text ? <HTML html={text} /> : <Text />}
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {numComments} {numComments === 1 ? 'comment' : 'comments'}
              </Text>
              <Separator />
              <Text style={styles.metaText}>by {by}</Text>
            </View>
            {this.state.expanded &&
              kids &&
              kids.map(
                id =>
                  items[id] ? (
                    <Comment
                      {...items[id]}
                      key={id}
                      items={items}
                      fetchItemForId={this.props.fetchItemForId}
                    />
                  ) : (
                    <Comment
                      {...{ _loading: false, loaded: false, id }}
                      key={id}
                      fetchItemForId={this.props.fetchItemForId}
                      items={items}
                    />
                  )
              )}
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
