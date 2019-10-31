import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../layout/Header';
import { getAllDocuments } from '../../actions/documentActions';
import Documents from '../documents/Documents';
import Breadcrumb from '../documents/Breadcrumb';

const Dashboard = ({ getAllDocuments }) => {
  useEffect(() => {
    getAllDocuments();
  }, []);

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
  { getAllDocuments }
)(Dashboard);
