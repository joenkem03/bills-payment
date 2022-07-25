import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './hooks/appHook';
// import { Provider } from 'react-redux';
// import { configureStore } from './redux/store';
import styled from 'styled-components';

import 'react-loading-skeleton/dist/skeleton.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
const UnsecuredPageWarning = styled.h1`
  color:red;
`
const Link = styled.a`
  color:blue;
  text-decoration: none;
`
const UnsecuredPage = () => (
  <div>
    <UnsecuredPageWarning>If you see this page, Webb App link you have clicked on is under Clickjacking security attack.</UnsecuredPageWarning>
    <h2>Please inform team with the reference of the application from where you clicked this link.</h2>
    <h2>Click <Link href={window.self.location.href} title='Web Application' target='blank'>here</Link> to access WebApp safely.</h2>
  </div>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
if(window.self === window.top) {
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
} else{
  root.render(<UnsecuredPage/>);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
