import React from "react";
import { observer } from "mobx-react/native";
import { RefreshControl } from "react-native";
import hnapi from "../utils/api.js";

import { loadingParams } from "../utils/animation.js";

import Headline from "./headline.js";
import ScrollView from "./scrollView.js";

@observer
class Headlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true
    };
  }

  _updateStories = cb => {
    hnapi.getTopStories().then(response => {
      this.props.storiesStore.updateStories(response.data);
      if (cb && typeof cb === "function") cb();
    });
  };
  componentDidMount() {
    this._updateStories(
      setTimeout(
        () =>
          this.setState({
            refreshing: false
          }),
        loadingParams.minAnimationDuration
      )
    );
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this._updateStories(() => {
      setTimeout(
        () =>
          this.setState({
            refreshing: false
          }),
        loadingParams.minAnimationDuration
      );
    });
  };

  render() {
    const { storiesStore, navigateToStory } = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {storiesStore &&
          storiesStore.storiesList &&
          storiesStore.storiesList.map((story, i) => {
            return (
              <Headline
                key={i}
                title={story.title}
                points={story.points}
                onPress={() => navigateToStory(story.id)}
                loading={this.state.refreshing}
                timeAgo={story.timeAgo}
                commentCount={story.commentCount}
                author={story.author}
              />
            );
          })}
      </ScrollView>
    );
  }
}

export default Headlines;
