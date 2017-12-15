import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

class Top extends React.Component {
  componentDidMount() {
    console.log('Mounted Top tab');
  }
  render() {
    const { stories, fetchStories } = this.props;
    return <Stories screenProps={{ stories, fetchStories }} />;
  }
}

// const Top = ({ stories, fetchStories }) => (
//   <Stories screenProps={{ stories, fetchStories }} />
// );

Top.navigationOptions = {
  tabBarLabel: 'Top',
  tabBarIcon: () => <Icon name="chevron-up" type="font-awesome" />,
};

export default withStoryData(Top, 'top');
