import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import AppState from './State/AppContext';
import axios from 'axios';
import SearchResult from './SearchResult';
import api from "./State/Api";

function OrderHistory() {
  const context = React.useContext(AppState);
  const uID = context.user ? context.user.id : "";
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get all sucessful orders
    api.getOrderHistory(uID).then(result => setData(Object.values(result))).catch(e => console.log(e));
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
      {data.map((order) => {
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
          })}
   

    </div>
  );
}

export default OrderHistory;
