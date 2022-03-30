import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './components/Login';
import Books from './components/Books';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route exact path="/login">
          <Login />
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
