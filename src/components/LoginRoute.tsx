import { useStoreState } from 'easy-peasy';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { FC } from 'react';
import { StoreModel } from '../model';

const LoginRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  return (
    <Route
      {...rest}
      render={() => {
        return !auth ? <>{children}</> : <Redirect to="/" />;
      }}
    />
  );
};
export default LoginRoute;
