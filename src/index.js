import React from 'react';
import ReactDOM from 'react-dom';
//引入国际化
import './i18n';
import App from './App';
import { Provider }from 'react-redux';
import  store from './redux/store';
import './assets/less/index.less'
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

