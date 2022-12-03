import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import CenterView from '../CenterView';

import Headline from 'common/components/headline';

export default storiesOf('Headline', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('loading', () => <Headline _loading />)
  .add('short content', () => (
    <View>
      <Headline _loading />
      <Headline
        title="Lorem ipsum dolor sit amet"
        by="author"
        score={10}
        descendants={15}
      />
    </View>
  ))
  .add('long content', () => (
    <View>
      <Headline _loading />
      <Headline
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        by="author"
        score={10}
        descendants={15}
      />
    </View>
  ))
  .add('hyperlink', () => (
    <View>
      <Headline _loading />
      <Headline
        title="Lorem ipsum dolor sit amet"
        by="author"
        score={10}
        descendants={15}
        type="hyperlink"
      />
    </View>
  ));
