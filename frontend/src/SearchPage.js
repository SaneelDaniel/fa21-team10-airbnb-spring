import React, { useEffect } from 'react';
import './SearchPage.css';
import { Button } from '@material-ui/core';
import SearchResult from './SearchResult';
import AppState from './State/AppContext';

function SearchPage() {
  const context = React.useContext(AppState);

  useEffect(() => {
    console.log(context.propertyData, 'Search Result Page');
  }, []);

  return (
    <div className="searchPage">
      <div className="searchPage__info">
        <h1>Stays nearby</h1>
        <Button variant="outlined">Cancellation Flexibility</Button>
        <Button variant="outlined">Type of place</Button>
        <Button variant="outlined">Price</Button>
        <Button variant="outlined">Rooms and beds</Button>
        <Button variant="outlined">More filters</Button>
      </div>
      {context.propertyData.length != 0
        ? context.propertyData.map((item) => {
            return (
              <SearchResult
                key={item.id}
                img={item.image}
                location={`${item.city}, ${item.state}, ${item.zip}`}
                title={item.name}
                description={item.description}
                star={4.73}
                price={`$${item.price}`}
                propertyObject={item}
              />
            );
          })
        : ''}
    </div>
  );
}

export default SearchPage;
