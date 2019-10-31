import React from 'react';
import './layout.css';

const SideNav = () => {
  return (
    <div>
      <ul id='slide-out' className='sidenav sidenav-fixed'>
        <li>
          <div className='user-view'>
            <a href='#user'>
              <img
                className='circle'
                src={require(`../../assets/img/avatar.jpeg`)}
              />
            </a>

            <span className='black-text name'>John Doe</span>
            <span className='black-text email'>jdandturk@gmail.com</span>
          </div>
        </li>
        <li className='active'>
          <a href='#!'>
            <i className='fas fa-home' style={{ fontSize: '1.25em' }} />
            Home
          </a>
        </li>
        <li>
          <a href='#!'>
            <i className='fas fa-archive' style={{ fontSize: '1.25em' }} />
            Archive
          </a>
        </li>
        <li>
          <a href='#!'>
            <i className='fas fa-user-circle' style={{ fontSize: '1.25em' }} />
            My Account
          </a>
        </li>
        <li>
          <a href='#!'>
            <i className='fas fa-sign-out-alt' style={{ fontSize: '1.25em' }} />
            Logout
          </a>
        </li>
      </ul>
      <a href='#' data-target='slide-out' class='sidenav-trigger show-on-large'>
        <i class='material-icons'>menu</i>
      </a>
    </div>
  );
};

export default SideNav;
