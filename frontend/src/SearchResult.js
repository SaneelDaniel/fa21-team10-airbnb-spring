import React from 'react';
import './SearchResult.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/Star';
import { useHistory } from 'react-router';
import AppState from './State/AppContext';

function SearchResult({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
  propertyObject,
}) {
  const history = useHistory();
  const context = React.useContext(AppState);
  return (
    <div
      className="searchResult"
      onClick={async () => {
        await context.SET_CURRENT_PROPERTY(propertyObject);
        history.push('/property');
      }}
    >
      <img src={img} alt="" />
      <FavoriteBorderIcon className="searchResult__heart" />

      <div className="searchResult__info">
        <div className="searchResult__infoTop">
          <p>{location}</p>
          <h3>{title}</h3>
          <p>____</p>
          <p>{description}</p>
        </div>

        <div className="searchResult__infoBottom">
          <div className="searchResult__stars">
            <StarIcon className="searchResult__star" />
            <p>
              <strong>{star}</strong>
            </p>
          </div>
          <div className="searchResults__price">
            <h2>{price}</h2>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
