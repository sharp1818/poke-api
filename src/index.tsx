import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { store } from './app/store';
import App from './App';
import theme from './utils/deepmerge';
import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={theme}>
          <Provider store={store}>
            <App />
          </Provider>
        </CssVarsProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
