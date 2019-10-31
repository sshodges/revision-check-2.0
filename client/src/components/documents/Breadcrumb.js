import React from 'react';

const Breadcrumb = () => {
  return (
    <nav style={style}>
      <div className='nav-wrapper' style={style}>
        <div className='col s12'>
          <a href='#!' className='breadcrumb blue-text'>
            Home
          </a>
          <a href='#!' className='breadcrumb grey-text'>
            Company ABC
          </a>
        </div>
      </div>
    </nav>
  );
};

const style = {
  backgroundColor: '#fff',
  boxShadow: 'none',
  color: '#000'
};

export default Breadcrumb;
