import ReactDOM from 'react-dom'
import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import App from './App';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(
    app,
    document.getElementById('root')
);