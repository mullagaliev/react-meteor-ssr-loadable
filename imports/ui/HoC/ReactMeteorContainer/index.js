import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import Loadable from "react-loadable";
import React from "react";

export const ReactMeteorContainer = function ({stateID = "randomKey", subscribeKeys = false, getState = () => false, ...props}) {
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

  const Container = (ReactComponent) => withTracker(() => {
    initDefaultState();
    return getState();
  })(ReactComponent);

  return ReactComponent => Loadable({
    loader: () => {
      return new Promise((res, rej) => {
        if (Meteor.isServer) {
          return res(Container(ReactComponent));
        }
        if (Meteor.isClient) {
          Meteor.subscribe('tasks', {
            onReady: () => res(Container(ReactComponent)),
            onError: () => rej(<div>Error Loading data...</div>)
          });
        }
      });
    },
    loading: () => <ReactComponent {...getDefaultState()}/>
  });
};

export default ReactMeteorContainer;
