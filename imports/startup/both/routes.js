import React from 'react';
import {Route} from 'react-router-dom';
import Main from '../../ui/layouts/main/Main';
// import {HomeMeteorContainer2} from '../../ui/pages/home/HomeMeteorContainer2';

import HomeLoadable from '../../ui/pages/home';
import SubpageLoadable from '../../ui/pages/subpage';
import AboutLoadable from '../../ui/pages/About';

export default (
  <Main>
    {/*<ReactMeteorContainer/>*/}
    <Route exact path="/" component={HomeLoadable}/>
    <Route exact path="/subpage" component={SubpageLoadable}/>
    <Route exact path="/about" component={AboutLoadable}/>
    {/*<HomeMeteorContainer2/>*/}
  </Main>
);
