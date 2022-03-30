import * as React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
