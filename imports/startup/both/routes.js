import React from 'react';
import {Route} from 'react-router-dom';
import Main from '../../ui/layouts/main/Main';
// import Loadable from 'react-loadable';
import {HomeLoadable, AboutLoadable, SubpageLoadable} from '../../ui/pages/LoadablePages';
// import AboutLoadable from '../../ui/pages/About';
// import SubpageLoadable from '../../ui/pages/subpage/Subpage';
// import HomeLoadable from '../../ui/pages/home/Home';


export default (
  <Main>
    <Route exact path="/" component={HomeLoadable}/>
    <Route exact path="/subpage" component={SubpageLoadable}/>
    <Route exact path="/about" component={AboutLoadable}/>
  </Main>
);
