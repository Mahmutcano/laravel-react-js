import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import FrontIndex from './View/İndex';
import FrontLogin from './View/Login';
import FrontRegister from './View/Register';
import {Provider} from 'mobx-react';
import Store from './Store';
import AuthStore from "./Store/AuthStore";
import ProductIndex from './View/Product/index';
import CreateProduct from './View/Product/create';

AuthStore.getToken();
const isLoggedIn = AuthStore.appState != null && AuthStore.appState.isLoggedIn;

function App() {
    return (
        <Routes>
            <Route path="/" element={<FrontIndex/>}/>
            <Route path="/login" element={<FrontLogin/>}/>
            <Route path="/register" element={<FrontRegister/>}/>
            <Route path="/urunler" element={<ProductIndex/>}/>
            <Route path="/urunler/ekle" element={<CreateProduct/>}/>
        </Routes>);
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider {...Store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>, document.getElementById('app'));
}
