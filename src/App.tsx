import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, ChakraProvider, Flex, theme } from '@chakra-ui/react';
import { useStoreState } from 'easy-peasy';
import Login from './routes/Login';
import Books from './routes/Books';
import Book from './components/Book';
import { StoreModel } from './model';
import Loader from './components/Loader';
import LoginRoute from './components/LoginRoute';

const App = () => {
  const loading = useStoreState((state: StoreModel) => state.user.loading);
  if (loading) {
    return <Loader />;
  }
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <LoginRoute exact path="/login">
          <Login />
        </LoginRoute>
        <Route path="/books/:id">
          <Flex bg="gray.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={6} rounded="md">
              <Book />
            </Box>
          </Flex>
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="*">
          <Redirect to={'/login'} />
        </Route>
      </Switch>
    </ChakraProvider>
  );
};
export default App;
