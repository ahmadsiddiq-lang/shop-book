import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Home from '../src/contents/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const Data = () => {
  return(
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/Home' exact component={Home} />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Data />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();