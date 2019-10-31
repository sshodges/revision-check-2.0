import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './layout.css';

const SideNav = ({ auth: { user } }) => {
  return (
    <div>
      <ul id='slide-out' className='sidenav sidenav-fixed'>
        <li>
          <div className='user-view'>
            <a href='#user'>
              <img
                className='circle'
                src={require(`../../assets/img/avatar.jpeg`)}
                alt='avatar'
              />
            </a>

            {user ? (
              <div>
                <span className='black-text name'>
                  {user.firstName} {user.lastName}
                </span>
                <span className='black-text email'>{user.email}</span>
              </div>
            ) : (
              <div>
                <span className='black-text name'></span>
                <span className='black-text email'></span>
              </div>
            )}
          </div>
        </li>
        <li className='active'>
          <Link to='/dashboard'>
            <i className='fas fa-home' style={{ fontSize: '1.25em' }} />
            Home
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i className='fas fa-archive' style={{ fontSize: '1.25em' }} />
            Archive
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i className='fas fa-user-circle' style={{ fontSize: '1.25em' }} />
            My Account
          </Link>
        </li>
        <li>
          <a href='#!'>
            <i className='fas fa-sign-out-alt' style={{ fontSize: '1.25em' }} />
            Logout
          </a>
        </li>
      </ul>
      <a
        href='#!'
        data-target='slide-out'
        className='sidenav-trigger show-on-large'
      >
        <i className='material-icons'>menu</i>
      </a>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(SideNav);
