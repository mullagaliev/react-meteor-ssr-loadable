import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Meteor from 'meteor/meteor';
import {onPageLoad} from 'meteor/server-render';
import Loadable from 'react-loadable';
import App from './App';


console.log(Meteor, onPageLoad);
// onPageLoad( (sink) => {
//   if (Meteor.isClient) {
    console.log('ready');
    // console.log(document);
    Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(<App/>, document.getElementById('app'));
    }).catch(err=> console.log(err));
  // }
// });
