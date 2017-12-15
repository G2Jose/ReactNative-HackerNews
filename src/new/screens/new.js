import React from 'react';
import { Icon } from 'react-native-elements';

import Stories from 'stories/stories';
import { withStoryData } from 'stories/stories.utils';

class New extends React.Component {
  componentDidMount() {
    console.log('Mounted New tab');
  }
  render() {
    const { stories, fetchStories } = this.props;
    return <Stories screenProps={{ stories, fetchStories }} />;
  }
}
// const New = ({ stories, fetchStories }) => (
//   <Stories screenProps={{ stories, fetchStories }} />
// );

New.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: () => <Icon name="newspaper-o" type="font-awesome" />,
};

export default withStoryData(New, 'new');
