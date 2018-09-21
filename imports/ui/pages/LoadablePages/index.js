import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/loading/Loading';

export const HomeLoadable = Loadable({
  loader: () => import('../../pages/home/Home'),
  loading: Loading
});

export const SubpageLoadable = Loadable({
  loader: () => import('../../pages/subpage/Subpage'),
  loading: Loading
});

export const AboutLoadable = Loadable({
  loader: () => import('../../pages/About'),
  loading: Loading
});

export default {
  HomeLoadable,
  SubpageLoadable,
  AboutLoadable
};
