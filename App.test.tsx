import React from 'react';
import renderer from 'react-test-renderer';
import App from '~/App';

it('renders without crashing', () => {
  jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView')); // See https://github.com/facebook/react-native/issues/13034
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
