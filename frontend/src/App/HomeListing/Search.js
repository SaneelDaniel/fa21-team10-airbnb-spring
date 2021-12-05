import React, { useState } from 'react';
import './Search.css';
import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router-dom';

function Search() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <div className="search">
      <h2>
        Number of guests
        <PeopleIcon />
      </h2>
      <input min={0} defaultValue={2} type="number" />
      <Button onClick={() => history.push('/search')}>Search Airbnb</Button>
    </div>
  );
}

export default Search;
