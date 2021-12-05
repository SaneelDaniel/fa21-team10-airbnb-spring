import React, { useEffect } from 'react';

import { Button } from '@material-ui/core';
import SearchResult from './SearchResult';
import AppState from './State/AppContext';

function SearchPage() {
  const context = React.useContext(AppState);

  useEffect(() => {
    console.log(context.propertyData, 'Search Result Page');
  }, []);

  return (
    <div className="search-page">
      <p>Property Page</p>
    </div>
  );
}

export default SearchPage;