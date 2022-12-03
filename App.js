import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { StatusBar, View, Platform, NativeModules } from 'react-native';
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
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#FF6701',
      showIcon: true,
      iconStyle: {
        width: 35,
        height: 30,
      },
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

const { StatusBarManager } = NativeModules;

const App = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#F6F6EF',
      paddingTop: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT,
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
