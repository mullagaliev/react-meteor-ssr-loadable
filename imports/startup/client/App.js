import React, {Component} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import routes from '../both/routes';
import mainReducer from '../../api/redux/reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger({});

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line

delete window.__PRELOADED_STATE__; // eslint-disable-line

const store = createStore(mainReducer, preloadedState, applyMiddleware(thunk, logger));

class App extends Component {
  constructor(props){
    super(props);
    console.log('init App');
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {routes}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
