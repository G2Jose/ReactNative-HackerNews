import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { backgroundColor } from 'common/constants';
import Headline from 'common/components/headline';
import Comment from 'items/comment';

import { fetchItem } from 'items/items.actions';

class Story extends React.Component {
  componentDidMount() {
    const { story, items, fetchItemForId } = this.props;
    if (story && story.kids) {
      story.kids.forEach(id => {
        if (!items.id) fetchItemForId(id);
      });
    }
  }

  render() {
    const { story, items } = this.props;
    const comments =
      story &&
      story.kids &&
      story.kids
        .map(commentId => items[commentId])
        .map(item => (!item ? { _loading: true, _loaded: false } : item));
    return (
      <View style={styles.headlineContainer}>
        <Headline {...story} />
        {comments.length > 0 && (
          <FlatList
            data={comments}
            renderItem={({ item }) => item && <Comment {...item} />}
            keyExtractor={(item, index) => (item && item.id) || index}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headlineContainer: {
    backgroundColor,
    flex: 1,
  },
});

Story.navigationOptions = {
  headerStyle: {
    backgroundColor,
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
