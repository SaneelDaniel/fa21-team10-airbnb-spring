import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import AppState from './State/AppContext';
import axios from 'axios';
import SearchResult from './SearchResult';

function OrderHistory() {
  const context = React.useContext(AppState);

  useEffect(() => {
    // Get all sucessful orders
    getOrderhistory();
  }, []);

  const getOrderhistory = async () => {
    const response = await axios
      .get(`getorderhistory api`)
      .then((res) => {
        if (res.data !== null) {
          context.setOrderHistory(res.data);
        }
      })
      .catch((err) => {
        console.log('Error in getting order history' + err);
      });
  };

  return (
    <div className="order-history">
      {context.propertyData.length != 0
        ? context.propertyData.map((order) => {
            return (
              <div className="order-history-item">
                <Button variant="contained" color="primary">
                  Raise an issue
                </Button>
                <SearchResult
                  key={order.id}
                  img={order.image}
                  location={`${order.city}, ${order.state}, ${order.zip}`}
                  title={order.name}
                  description={order.description}
                  star={4.73}
                  price={`You've paid $${order.price}`}
                  propertyObject={order}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}

export default OrderHistory;
