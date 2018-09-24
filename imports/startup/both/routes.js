import React from 'react';
import {Route} from 'react-router-dom';
import Main from '../../ui/layouts/main/Main';
// import Loadable from 'react-loadable';
// import {HomeLoadable, AboutLoadable, SubpageLoadable} from '../../ui/pages/LoadablePages';
import AboutLoadable from '../../ui/pages/About';
import SubpageLoadable from '../../ui/pages/subpage/Subpage';
// import HomeLoadable from '../../ui/pages/home/Home';
// import HomeLoadable from '../../ui/pages/home/HomeMeteorContainer';
import {HomeLoadable} from '../../ui/pages/home/HomeMeteorContainer';
import {HomeMeteorContainer} from '../../ui/pages/home/HomeMeteorContainer';
import {HomeMeteorContainer2} from '../../ui/pages/home/HomeMeteorContainer2';

export default (
  <Main>
    {/*<ReactMeteorContainer/>*/}
    <Route exact path="/" component={HomeMeteorContainer}/>
    <Route exact path="/subpage" component={SubpageLoadable}/>
    <Route exact path="/about" component={AboutLoadable}/>
    <HomeMeteorContainer2/>
  </Main>
);
