import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Index = lazy(() => import('../page/Index'));
// const Login = lazy(() => import('../page/Login'));

class RoutesIndex extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Index} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default RoutesIndex;
