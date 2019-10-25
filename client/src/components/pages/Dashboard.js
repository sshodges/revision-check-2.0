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
      <table class='table'>
        <tbody>
          {allDocuments ? (
            allDocuments.map(document => (
              <tr key={document.id}>
                <th scope='row'>1</th>
                <td>
                  <img
                    className='img-responsive'
                    style={iconStyles}
                    src={require(`../../assets/img/${document.type}.png`)}
                  />
                </td>
                <td>{document.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <Spinner />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const iconStyles = {
  width: '25px',
  display: 'inline-block',
  marginTop: '-5px',
  marginRight: '15px'
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(
  mapStateToProps,
  { getAllDocuments }
)(Dashboard);
