import React from 'react';
import {Route} from 'react-router-dom';
import Main from '../../ui/layouts/main/Main';
// import Loadable from 'react-loadable';
import {HomeLoadable, AboutLoadable, SubpageLoadable} from '../../ui/pages/LoadablePages';

export default (
  <Main>
    <Route exact path="/" component={HomeLoadable}/>
    <Route exact path="/subpage" component={SubpageLoadable}/>
    <Route exact path="/about" component={AboutLoadable}/>
  </Main>
);
