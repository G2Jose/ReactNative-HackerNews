import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import CenterView from '../CenterView';

import Comment from 'comments/comment.ui';

export default storiesOf('Comment', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('loading', () => <Comment _loading />)
  .add('short content', () => (
    <View>
      <Comment _loading />
      <Comment
        text="Lorem ipsum dolor sit amet"
        by="author"
        kids={[null, null, null]}
        items={[{}, {}]}
        fetchComment={() => {}}
        _loaded
      />
    </View>
  ))
  .add('long content', () => (
    <View>
      <Comment _loading />
      <Comment
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        by="author"
        kids={[null, null, null]}
        items={[{}, {}]}
        fetchComment={() => {}}
        _loaded
      />
    </View>
  ));
