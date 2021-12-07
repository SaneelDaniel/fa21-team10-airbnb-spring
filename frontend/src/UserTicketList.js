import React, { Component, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import AppState from './State/AppContext';
import axios from 'axios';
import api from './State/Api';
import { useHistory } from 'react-router';
// import { Link } from "react-router-dom";

const data = [
  { name: 'John', email: 'john@gmail.com', age: 12, gender: 'Male' },
  { name: 'Bren', email: 'bren@gmail.com', age: 24, gender: 'Male' },
  { name: 'Marry', email: 'marry@gmail.com', age: 18, gender: 'Female' },
  { name: 'Shohail', email: 'shohail@gmail.com', age: 25, gender: 'Male' },
  { name: 'Aseka', email: 'aseka@gmail.com', age: 19, gender: 'Female' },
  { name: 'Meuko', email: 'meuko@gmail.com', age: 12, gender: 'Female' },
];

const columns = [
  {
    title: 'Booking Id',
    field: 'bookingId',
  },
  {
    title: 'Request Description',
    field: 'requestDescription',
  },
  {
    title: 'Request Status',
    field: 'requestStatus',
  },
  {
    title: 'Request Type',
    field: 'requestType',
  },
];

function UserTicketList() {
  const [requestData, setRequestData] = useState();
  const context = useContext(AppState);
  const uID = context.user ? context.user.id : '';
  const history = useHistory();

  useEffect(() => {
    if (!context.loggedIn) {return;}

    api.getIssueRequestsByUserId(uID).then((res) => {
      console.log('Issue Response', res);
      setRequestData(res);
    });
  }, []);

  if (!context.loggedIn) {
    history.push('/');
  }

  return (
    <>
      {requestData?.length > 0 ? (
        <div className="container-fluid" style={{ margin: '30px' }}>
          <div>
            <MaterialTable
              title="My Issues"
              data={requestData}
              columns={columns}
              style={{ padding: '10px' }}
              options={{
                headerStyle: {
                  backgroundColor: '#d3d3d3',
                  color: '#080808',
                },
              }}
            />
          </div>
        </div>
      ) : (
        <h3>No Issues Raised Yet</h3>
      )}
    </>
  );
}

export default UserTicketList;
