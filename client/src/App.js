import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import setAuthToken from './utils/setAuthToken';
//Components
import Dashboard from './components/pages/Dashboard';
import Index from './components/pages/Index';
import SideNav from './components/layout/SideNav';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <SideNav />
          <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/' component={Index} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
