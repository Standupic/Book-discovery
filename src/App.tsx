import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './routes/Login';
import Books from './routes/Books';
import Book from './routes/Book';
import ProtectedRoute from './components/ProtectedRoute';
import LoaderWrapper from './components/LoaderWrapper';
import WaitForStateRehydration from './components/WaitForStateRehydration';

const App = () => {
  return (
    <WaitForStateRehydration>
      <LoaderWrapper>
        <ChakraProvider theme={theme}>
          <Switch>
            <ProtectedRoute exact path="/login">
              <Login />
            </ProtectedRoute>
            <ProtectedRoute path="/books/:id">
              <Book />
            </ProtectedRoute>
            <ProtectedRoute path="/books">
              <Books />
            </ProtectedRoute>
            <Route path="*">
              <Redirect to={'/login'} />
            </Route>
          </Switch>
        </ChakraProvider>
      </LoaderWrapper>
    </WaitForStateRehydration>
  );
};
export default App;
