import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import './documents.css';

const Documents = ({ document: { allDocuments } }) => {
  return (
    <div className='row'>
      <ul class='collection' style={{ border: 'none' }}>
        {allDocuments ? (
          allDocuments.map(document => (
            <li key={document.id} class='collection-item'>
              <div>
                <img
                  className='img-responsive'
                  style={iconStyles}
                  src={require(`../../assets/img/${document.type}.png`)}
                />
                {document.name}
                <a href='' class='secondary-content'>
                  <i class='material-icons'>archive</i>
                </a>
                <a href='' class='secondary-content'>
                  <i class='material-icons'>edit</i>
                </a>
              </div>
            </li>
          ))
        ) : (
          <tr>
            <Spinner />
          </tr>
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
