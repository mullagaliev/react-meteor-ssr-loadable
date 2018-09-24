import React from 'react';
import {renderToString} from 'react-dom/server';
import {onPageLoad} from 'meteor/server-render';
import {StaticRouter} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {object} from 'prop-types';
import {Helmet} from 'react-helmet';
import mainReducer from '../../api/redux/reducers';
import routes from '../both/routes';
import {todosGetAll} from '../../api/todos/methods';
import Loadable from 'react-loadable';

Loadable.preloadAll().then(() => {
  console.log('SSR init');
});


let renderCount = 0;

onPageLoad((sink) => {

  const context = {};
  global.__state__ = {};
  const initial = todosGetAll.call({});

  const store = createStore(mainReducer, {todos: initial}, applyMiddleware(thunk));


  const App = props => (
    <Provider store={store}>
      <StaticRouter location={props.location} context={context}>
        {routes}
      </StaticRouter>
    </Provider>
  );

  App.propTypes = {
    location: object.isRequired,
  };

  const preloadedState = store.getState();

  let modules = [];
  const AppLoadable = () => (<Loadable.Capture report={moduleName => modules.push(moduleName)}>
    <App location={sink.request.url}/>
  </Loadable.Capture>);

  sink.renderIntoElementById('app', renderToString(<AppLoadable/>));

  if(!global.__STATE__)
    global.__STATE__ = {};

  if (Meteor.isServer)
    console.log(modules);

  console.log(renderCount++);
  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());

  sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `);
  sink.appendToBody(`
      <script>
        window.__MODULES__=${JSON.stringify(modules)};
      </script>
  `);
  sink.appendToBody(`
      <script>
        window.__STATE__=${JSON.stringify(global.__STATE__ ).replace(/</g, '\\u003c')};
      </script>
  `);
});
