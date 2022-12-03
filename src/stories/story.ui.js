import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { colors } from 'common/constants';
import Headline from 'common/components/headline';
import Comment from 'comments/comment.ui';

import { fetchItem } from 'items/items.actions';

class Story extends React.Component {
  componentDidMount() {
    const { story, items, fetchItemForId } = this.props;
    if (story && story.kids) {
      story.kids.forEach(id => {
        if (!items.id && id) fetchItemForId(id);
      });
    }
  }

  render() {
    const { story, items, fetchItemForId } = this.props;
    const comments =
      (story &&
        story.kids &&
        story.kids
          .map(commentId => items[commentId])
          .map(item => (!item ? { _loading: true, _loaded: false } : item))) ||
      [];
    return (
      <View style={styles.storyContainer}>
        <View style={styles.headlineContainer}>
          <Headline {...story} />
        </View>
        {comments.length > 0 && (
          <FlatList
            data={comments}
            renderItem={({ item }) =>
              item && (
                <Comment
                  {...item}
                  items={items}
                  fetchComment={fetchItemForId}
                />
              )
            }
            keyExtractor={(item, index) => (item && item.id) || index}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  storyContainer: {
    backgroundColor: colors.background,
    flex: 1,
    paddingLeft: 0,
    paddingRight: 15,
  },
  headlineContainer: {
    paddingLeft: 15,
  },
});

Story.navigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
};

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  fetchItemForId: id => {
    dispatch(fetchItem({ id }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);
