import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import RouteIndex from './route';
import logo from './logo.svg';
import './App.less';

import betaAction from './redux/action/beta';

@connect(state => state)
class App extends Component {
    componentDidMount() {
        // console.log(this.props);
    }
    handleClick() {
        this.props.dispatch(betaAction.betaChange());
    }
    render() {
        const { beta } = this.props;
        // console.log(beta);
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
                    <button onClick={this.handleClick.bind(this)}>change</button>
                    <div>beta:{beta.text}</div>
                </header>
                <Router>
                    <RouteIndex />
                </Router>
            </div>
        );
    }
}

export default App;
