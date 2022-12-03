import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';
import 'rxjs';

import store from 'common/store/store';

import Top from 'top/screens/top';
import New from 'new/screens/new';
import Show from 'show/screens/show';
import Ask from 'ask/screens/ask';
import Jobs from 'jobs/screens/jobs';

// eslint-disable-next-line no-global-assign
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

const Navigation = TabNavigator(
  {
    Top: {
      screen: Top,
    },
    New: {
      screen: New,
    },
    Show: {
      screen: Show,
    },
    Ask: {
      screen: Ask,
    },
    Jobs: {
      screen: Jobs,
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#FF6701',
      showIcon: true,
      labelStyle: {
        color: 'black',
      },
      style: {
        backgroundColor: '#F7F7F7',
      },
      indicatorStyle: {
        backgroundColor: '#FF6701',
      },
    },
  }
);

const App = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#F6F6EF',
      paddingTop: Constants.statusBarHeight,
    }}
  >
    <StatusBar backgroundColor="orange" barStyle="dark-content" />
    <Navigation />
  </View>
);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
