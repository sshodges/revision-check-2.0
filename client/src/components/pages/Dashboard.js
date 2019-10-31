import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import { getAllDocuments } from '../../actions/documentActions';
import { getUser } from '../../actions/authActions';
import Documents from '../documents/Documents';
import Breadcrumb from '../documents/Breadcrumb';

const Dashboard = ({ getAllDocuments, getUser }) => {
  useEffect(() => {
    getUser();
    getAllDocuments();
  }, [getUser, getAllDocuments]);

  return (
    <div className='container' style={{ marginLeft: '350px' }}>
      <Header />
      <Breadcrumb />
      <Documents />
    </div>
  );
};

export default connect(
  null,
  { getAllDocuments, getUser }
)(Dashboard);
