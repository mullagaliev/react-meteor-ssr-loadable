import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {onPageLoad} from 'meteor/server-render';
import Loadable from 'react-loadable';
import App from './App';


onPageLoad(async sink => {
  if (Meteor.isClient) {
    console.log('ready');

    // __webpack_modules__ = {};
    // if (window.__MODULES__) {
    //   console.log(window.__MODULES__);
    //   await Loadable.preloadablesReady(window.__MODULES__);
    // }
    // if (window.__MODULES__) {
    //   await Promise.all(
    //     __MODULES__.map(
    //       (moduleName) => import(moduleName)
    //         .then((mod) => {
    //           // __webpack_modules__[moduleName] = mod;
    //           // return mod;
    //         })
    //     )
    //   )
    // }
    Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(<App/>, document.getElementById('app'));
    });
  }
});

