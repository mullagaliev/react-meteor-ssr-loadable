import React from "react";
import Loadable from "react-loadable";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {waitAllSubscribe} from './utils';
import {Error} from './Error';

export const ReactMeteorContainer = function (stateID, subscribeKeys = false, getState = () => false) {

  function getDefaultState() {
    return Meteor.isClient ? window.__STATE__[stateID] : getState();
  }

  function initDefaultState() {
    if (Meteor.isServer) {
      if (!global.__STATE__)
        global.__STATE__ = {};
      global.__STATE__[stateID] = getState();
      console.log('init default state');
    }
  }

  return ReactComponent => Loadable({
    loader: async () => {
      const isLoading = await waitAllSubscribe(subscribeKeys);
      if (!isLoading)
        return () => <Error text='Error Loading data...'/>;

      return withTracker(() => {
        initDefaultState();
        return getState();
      })(ReactComponent);
    },
    loading: () => <ReactComponent {...getDefaultState()}/>
  });
};

export default ReactMeteorContainer;
