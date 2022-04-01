import { useStoreState } from 'easy-peasy';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { FC } from 'react';
import { StoreModel } from '../model';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { path } = rest;
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  return (
    <Route
      {...rest}
      render={() => {
        if (path === '/books' || path === '/books/:id') {
          return !auth ? <Redirect to="/login" /> : <>{children}</>;
        }
        if (path === '/login') {
          return !auth ? <>{children}</> : <Redirect to="/books" />;
        }
      }}
    />
  );
};
export default ProtectedRoute;
