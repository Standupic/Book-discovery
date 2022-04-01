import { useStoreState } from 'easy-peasy';
import { FC } from 'react';
import { StoreModel } from '../model';
import Loader from './Loader';

const LoaderWrapper: FC = ({ children }) => {
  const loading = useStoreState((state: StoreModel) => state.user.loading);
  return <>{loading ? <Loader /> : <>{children}</>}</>;
};

export default LoaderWrapper;
