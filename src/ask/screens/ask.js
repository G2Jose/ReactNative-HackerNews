import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

class Ask extends React.Component {
  componentDidMount() {
    console.log('Mounted Ask tab');
  }
  render() {
    const { stories, fetchStories } = this.props;
    return <Stories screenProps={{ stories, fetchStories }} />;
  }
}

// const Ask = ({ stories, fetchStories }) => (
//   <Stories screenProps={{ stories, fetchStories }} />
// );

Ask.navigationOptions = {
  tabBarLabel: 'Ask',
  tabBarIcon: () => <Icon name="question" type="font-awesome" />,
};

export default withStoryData(Ask, 'ask');
