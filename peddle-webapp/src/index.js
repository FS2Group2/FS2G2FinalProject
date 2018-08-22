import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import Header from "./Header";


//ReactDOM.render(<Header/>, document.getElementById('root'));
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
