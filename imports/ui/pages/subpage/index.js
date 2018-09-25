import Loadable from "react-loadable";
import Loading from '../../components/loading/Loading';

export const SubpageLoadable = Loadable({
  loader: () => import('../../pages/subpage/Subpage'),
  loading: Loading
});

export default SubpageLoadable;
