import React, { useEffect, useState } from 'react';
import { Button, Select } from '@material-ui/core';
import AppState from './State/AppContext';
import axios from 'axios';
import OrderProductResult from './OrderProductResult';
import api from './State/Api';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router';
// import Select from 'react-select';
function OrderHistory() {
  const context = React.useContext(AppState);
  const uID = context.user ? context.user.id : '';
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const history = useHistory();

  console.log(context);

  useEffect(() => {
    // Get all sucessful orders
    if (context.loggedIn){

      api
        .getOrderHistory(uID)
        .then((result) => {
          
          setData(result);
        })
        .catch((e) => console.log(e));
    }
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

  if (!context.loggedIn) {
    history.push('/');
  }

  return (
    <div className="order-history">
      {data.map((order) => {
        return (
          <div className="order-history-item" key={order.id}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3>Order: {order.id}</h3>
              <h3>Order Date: {order.bookingDate}</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  await context.SET_CURRENT_ISSUE_PROPERTY(order);
                  history.push(`/raiseticket`);
                }}
              >
                Raise an issue
              </Button>
            </div>

            <OrderProductResult
              key={order.id}
              img={order.property.image}
              location={`${order.property.city}, ${order.property.state}, ${order.property.zip}`}
              title={order.property.name}
              description={order.property.description}
              star={4.73}
              price={`You've paid $${order.property.price}`}
              propertyObject={order}
            />
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
