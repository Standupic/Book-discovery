import { useStoreRehydrated } from 'easy-peasy';
import { FC } from 'react';

const WaitForStateRehydration: FC = ({ children }) => {
  const isRehydrated = useStoreRehydrated();
  return <>{isRehydrated ? children : null}</>;
};

export default WaitForStateRehydration;
