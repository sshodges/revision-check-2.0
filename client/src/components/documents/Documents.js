import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import './documents.css';

const Documents = ({ document: { allDocuments } }) => {
  return (
    <div className='row'>
      <ul className='collection' style={{ border: 'none' }}>
        {allDocuments ? (
          allDocuments.map(document => (
            <li key={document._id} className='collection-item'>
              <div>
                <img
                  className='img-responsive'
                  style={iconStyles}
                  src={require(`../../assets/img/${document.type}.png`)}
                  alt='icon'
                />
                {document.name}
                <a href='#!' className='secondary-content'>
                  <i className='material-icons'>archive</i>
                </a>
                <a href='#!' className='secondary-content'>
                  <i className='material-icons'>edit</i>
                </a>
              </div>
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

const iconStyles = {
  width: '25px',
  display: 'inline-block',
  marginRight: '15px'
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(
  mapStateToProps,
  null
)(Documents);
