import React, {createContext} from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/styles.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'flowbite';

// Store imports
import AuthStore from "./store/auth-store";
import HomeStore from "./store/Home/home-store";

// Store instances
const authStore = new AuthStore();
const homeStore = new HomeStore();

// Stores merge in context
export const Context = createContext({
   authStore,
   homeStore
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Stores gives
    <Context.Provider value={{authStore, homeStore}}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
