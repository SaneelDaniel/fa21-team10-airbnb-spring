import React, { useState } from 'react';
import './Banner.css';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function Banner() {
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner">
      <div className="banner__info">
        <h1>Get out and streach your imagination</h1>
        <h5>Plan a different find of gateway to uncover the hidden gems near you.</h5>
        <Button onClick={() => history.push('/search')} variant="outlined">
          Explore Nearby
        </Button>
      </div>
    </div>
  );
}

export default Banner;
