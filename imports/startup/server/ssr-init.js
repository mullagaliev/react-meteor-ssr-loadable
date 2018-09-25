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
import {getBundles} from 'react-loadable/webpack';
import stats from '../../../dist/react-loadable.json';
import App from './App';

Loadable.preloadAll().then(() => {
  let renderCount = 0;
  onPageLoad((sink) => {
    const context = {};
    global.__state__ = {};
    const initial = todosGetAll.call({});

    const store = createStore(mainReducer, {todos: initial}, applyMiddleware(thunk));


    const preloadedState = store.getState();

    let modules = [];
    const html = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <App location={sink.request.url}
             store={store}
             context={context}/>
      </Loadable.Capture>);
    // const html2 = renderToString(<div>Hello World!</div>);
    let bundles = getBundles(stats, modules);
    console.log({modules, bundles});

    sink.renderIntoElementById('app', html);
    if (!global.__STATE__)
      global.__STATE__ = {};

    if (Meteor.isServer) {
    }

    console.log(renderCount++);
    const helmet = Helmet.renderStatic();
    sink.appendToHead(helmet.meta.toString());
    sink.appendToHead(helmet.title.toString());

    sink.appendToBody(`
     <div id="app">${html}</div>
    `);

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
          window.__STATE__=${JSON.stringify(global.__STATE__).replace(/</g, '\\u003c')};
        </script>
    `);

    // bundles.map(bundle => {
    //   if(bundle && bundle.file)
    //     return sink.appendToBody(`<script src="/dist/${bundle.file}"></script>`);
    //   return false;
    // });

    sink.appendToBody(`<script src="manifest.js"></script>`);
      bundles.map(bundle => {
          if(bundle && bundle.publicPath)
            return `<script src="${bundle.publicPath}"></script>`;
          return '';
        }).join('\n');
    sink.appendToBody(`<script src="main.js"></script>`);
  });
});

