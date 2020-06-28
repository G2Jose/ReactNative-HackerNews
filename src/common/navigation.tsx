import React from 'react';

/* eslint-disable react/no-multi-comp */

export const mapNavigationStateParamsToProps = (SomeComponent) => {
  class WrappedComponent extends React.Component {
    render() {
      console.log('xxx', this.props);
      const {
        route: { params },
      } = this.props;
      return <SomeComponent {...params} />;
    }
  }

  WrappedComponent.navigationOptions = SomeComponent.navigationOptions;
  return WrappedComponent;
};

export const mapScreenPropsToProps = (SomeComponent) => {
  class WrappedComponent extends React.Component {
    render() {
      const { screenProps, ...otherProps } = this.props;
      return <SomeComponent {...screenProps} {...otherProps} />;
    }
  }

  WrappedComponent.navigationOptions = SomeComponent.navigationOptions;
  return WrappedComponent;
};
65;

/* eslint-enable react/no-multi-comp */
