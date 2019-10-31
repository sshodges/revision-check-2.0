import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

//Components
import Dashboard from './components/pages/Dashboard';
import SideNav from './components/layout/SideNav';

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
            <Route exact path='/' component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
