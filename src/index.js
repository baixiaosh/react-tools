import 'lib-flexible';
import 'babel-polyfill';
import 'common/js/share';
import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import 'common/less/base.less';
import { Provider } from 'react-redux';
import { Store } from './redux/index';
import Routes from './route';
import config from 'config';
import * as serviceWorker from './serviceWorker';

import VConsole from 'vconsole/dist/vconsole.min.js';

ReactDOM.render(
  <Provider store={Store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
if ('addEventListener' in document) {
  document.body.addEventListener(
    'DOMContentLoaded',
    () => {
      FastClick.attach(document.body);
    },
    false
  );
  document.body.addEventListener('touchstart', () => {});
}

config.consoleLog && new VConsole();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
