import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllDocuments } from '../../actions/documentActions';

const Dashboard = ({ document: { allDocuments }, getAllDocuments }) => {
  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <div className='row'>
      {allDocuments ? (
        allDocuments.map(document => <h1>Hello</h1>)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(
  mapStateToProps,
  { getAllDocuments }
)(Dashboard);
