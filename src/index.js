import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './hooks/appHook';
// import { Provider } from 'react-redux';
// import { configureStore } from './redux/store';

import 'react-loading-skeleton/dist/skeleton.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <Provider store={configureStore()}>
    <AppProvider>
      <BrowserRouter>
        <React.StrictMode>
          <Suspense fallback={<div className="loading" />}>
            <App />
          </Suspense>
        </React.StrictMode>
      </BrowserRouter>
    </AppProvider>
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
