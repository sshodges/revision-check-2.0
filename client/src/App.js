import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

//Components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import Sidebar from './components/layout/Sidebar';

const App = () => {
  useEffect(() => {});
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Sidebar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Dashboard} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
