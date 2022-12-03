import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView')); // See https://github.com/facebook/react-native/issues/13034
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
