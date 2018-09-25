import Loadable from "react-loadable";
import Loading from '../../components/loading/Loading';

export const HomeLoadable = Loadable({
  loader: () => import('./HomeMeteorContainer'),
  loading: Loading
});

export default HomeLoadable;
