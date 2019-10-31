import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from '@trendmicro/react-sidenav';
import Dashboard from '../pages/Dashboard';

import '../../assets/styles/react-sidenav.css';

const Sidebar = () => {
  return (
    <Router>
      <Route
        render={({ location, history }) => (
          <Fragment>
            <SideNav
              onSelect={selected => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
            >
              <Toggle />
              <Nav defaultSelected='dashboard'>
                <NavItem eventKey='dashboard'>
                  <NavIcon>
                    <i className='fas fa-home' style={{ fontSize: '1.25em' }} />
                  </NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
                <NavItem eventKey='archives'>
                  <NavIcon>
                    <i
                      className='fas fa-archive'
                      style={{ fontSize: '1.25em' }}
                    />
                  </NavIcon>
                  <NavText>Archives</NavText>
                </NavItem>
                <NavItem eventKey='myaccount'>
                  <NavIcon>
                    <i
                      className='fas fa-user-circle'
                      style={{ fontSize: '1.25em' }}
                    />
                  </NavIcon>
                  <NavText>My Account</NavText>
                </NavItem>
                <NavItem eventKey='logout'>
                  <NavIcon>
                    <i
                      className='fas fa-sign-out-alt'
                      style={{ fontSize: '1.25em' }}
                    />
                  </NavIcon>
                  <NavText>Logout</NavText>
                </NavItem>
              </Nav>
            </SideNav>
            <main>
              <Route path='/' exact component={Dashboard} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/archives' component={Dashboard} />
              <Route path='/myaccount' component={Dashboard} />
              <Route path='/logout' component={Dashboard} />
            </main>
          </Fragment>
        )}
      />
    </Router>
  );
};

export default Sidebar;
