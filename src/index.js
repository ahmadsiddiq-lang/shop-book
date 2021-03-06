import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Home from '../src/contents/Home';
import Login from '../src/contents/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
const Data = () => {

  return(
    <Provider store={store}>
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Data />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
