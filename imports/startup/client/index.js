import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {onPageLoad} from 'meteor/server-render';
import Loadable from 'react-loadable';
import App from './App';


onPageLoad(async sink => {
  if (Meteor.isClient) {
    console.log('ready');

    // if (window.__MODULES__) {
    //   console.log(window.__MODULES__);
    //   await Loadable.preloadablesReady(window.__MODULES__);
    // }

    Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(<App/>, document.getElementById('app'));
    });
  }
});

