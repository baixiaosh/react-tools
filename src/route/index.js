import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import AsyncComponent from '../components/AsyncComponent';
import Index from '../page/Index';
// const Login = AsyncComponent(() => import('../page/Login'));

class RoutesIndex extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Index} />
            </Switch>
        );
    }
}

export default RoutesIndex;
