import React from 'react';

const Breadcrumb = () => {
  return (
    <nav style={style}>
      <div class='nav-wrapper' style={style}>
        <div class='col s12'>
          <a href='#!' class='breadcrumb blue-text'>
            Home
          </a>
          <a class='breadcrumb grey-text'>Company ABC</a>
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
