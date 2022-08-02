import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import rootReducer from './modules';
import ReduxThunk from "redux-thunk";
import AuthService from './service/auth_service';
import setAuthorizationToken from "./utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";

const root = ReactDOM.createRoot(document.getElementById('root'));
const authService = new AuthService();
const store = createStore( rootReducer, applyMiddleware(ReduxThunk));


// 리로드시에도 유지
if(localStorage.getItem("Authorization")){
  setAuthorizationToken(localStorage.getItem("Authorization"));
  store.dispatch({type:'LOG_IN', user: jwtDecode(localStorage.getItem("Authorization"))});
}
root.render(
  <React.StrictMode>
    <Provider store={ store }>
    <App authService={authService} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
