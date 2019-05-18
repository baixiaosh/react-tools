import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import logo from './logo.svg';
import RouteIndex from './route';
import stores from './mobx';

import './App.less';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
                <Provider {...stores}>
                    <Router>
                        <RouteIndex />
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
