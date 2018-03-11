import React from 'react';
import ReactDOM from 'react-dom';

import {RouterWrapper} from './routes'
import {Provider} from 'react-redux';
import {Store} from './store/store'
import './assets/css/vendor.css';
import './assets/css/app-green.css';
import './panel.css';

ReactDOM.render(
    <Provider store={Store}>
        <RouterWrapper/>
    </Provider>
    , document.getElementById('root')
);
