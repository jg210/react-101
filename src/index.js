import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

document.title = "FSA Food Hygiene Ratings";
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
