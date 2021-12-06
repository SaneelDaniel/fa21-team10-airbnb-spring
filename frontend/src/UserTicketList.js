import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';

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
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Email',
    field: 'email',
  },
  {
    title: 'Age',
    field: 'age',
  },
  {
    title: 'Gender',
    field: 'gender',
  },
];

class Home extends Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <MaterialTable title="Employee Details" data={data} columns={columns} />
        </div>
      </>
    );
  }
}

export default Home;
