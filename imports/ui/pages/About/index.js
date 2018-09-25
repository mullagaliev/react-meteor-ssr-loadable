import Loadable from "react-loadable";
import Loading from '../../components/loading/Loading';

export const AboutLoadable = Loadable({
  loader: () => import('../../pages/About'),
  loading: Loading
});

export default AboutLoadable;
