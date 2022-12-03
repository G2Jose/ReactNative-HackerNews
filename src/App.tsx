import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { StatusBar, View, Platform, NativeModules } from 'react-native';
import 'rxjs';
import { Icon } from 'react-native-elements';
import store from '~/common/store/store';

import Top from '~/screens/top';
import New from '~/screens/new';
import Show from '~/screens/show';
import Ask from '~/screens/ask';
import Jobs from '~/screens/jobs';

// import StorybookUI from '../storybook';

// eslint-disable-next-line no-global-assign
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
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
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const Icons = {
            Top: 'chevron-up',
            Ask: 'question',
            Jobs: 'suitcase',
            New: 'bar-chart',
            Show: 'tv',
          };
          return <Icon name={Icons[route.name]} type="font-awesome" />;
        },
      })}
    >
      <Tab.Screen name="Top" component={Top} />
      <Tab.Screen name="New" component={New} />
      <Tab.Screen name="Show" component={Show} />
      <Tab.Screen name="Ask" component={Ask} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
};

// TabNavigator(
//   {
//     Top: {
//       screen: Top,
//     },
//     New: {
//       screen: New,
//     },
//     Show: {
//       screen: Show,
//     },
//     Ask: {
//       screen: Ask,
//     },
//     Jobs: {
//       screen: Jobs,
//     },
//   },
//   {
//     tabBarPosition: 'bottom',
//     animationEnabled: false,
//     lazy: true,
//     tabBarOptions: {
//       activeTintColor: '#000000',
//       activeBackgroundColor: '#FF6701',
//       showIcon: true,
//       iconStyle: {
//         width: 35,
//         height: 30,
//       },
//       labelStyle: {
//         color: 'black',
//       },
//       style: {
//         backgroundColor: '#F7F7F7',
//       },
//       indicatorStyle: {
//         backgroundColor: '#FF6701',
//       },
//     },
//   }
// );

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
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

export default ReduxApp;
