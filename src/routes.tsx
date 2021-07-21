import React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Product from './pages/Product';
import RedefinePassword from './pages/RedefinePassword';
import history from './utils/history';

export default function Routes() {
    return (
        <Router history={history}>
            <Route path='/' exact component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/redefine-password' component={RedefinePassword} />
            <Route path='/product' component={Product}/>
            <Route path='/login' component={Login}/>
        </Router>
    )
}