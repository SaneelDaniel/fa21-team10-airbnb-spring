import React, { useEffect } from 'react';
import './PropertyPage.css';
import { Button } from '@material-ui/core';
import SearchResult from './SearchResult';
import AppState from './State/AppContext';
import axios from 'axios';
import api from './State/Api';
import { useHistory } from 'react-router';
import Select from 'react-select';

function OrderTicketPage() {
  const context = React.useContext(AppState);
  const [selectedIssueOption, setSelectedIssueOption] = React.useState(null);
  const history = useHistory();
  const currentIssueProperty = context.currentIssueProperty;
  const property = context.currentIssueProperty.property;
  const booking = context.currentIssueProperty.booking;

  useEffect(() => {}, []);

  const issueTypeSelected = [
    { value: '1', label: 'Cancel Order' },
    { value: '2', label: 'Contact Admin' },
  ];

  const [userid, setUserid] = React.useState('');

  const [notes, setNotes] = React.useState('');

  const submitIssue = async (event) => {
    event.preventDefault();
    const issueNotes = document.getElementById('issue_notes').value;
    const selectedIssue =
      selectedIssueOption.value == 1 ? 'Cancel_Order' : 'Contact_Admin';
    const bookingId = context.currentIssueProperty.booking.id;
    const userId = context.currentIssueProperty.booking.userId;

    const data = {
      userId: userId,
      bookingId: bookingId,
      requestType: selectedIssue,
      requestDescription: issueNotes,
      requestStatus: 'Pending',
    };

    const response = await api.postBookingIssueTicket(data);

    if (response === 200) {
      history.push('/issues');
    }
  };

  if (!property) {
    return <h1>Unavailable</h1>;
  }

  return (
    <div className="property-page">
      <img src={property?.image}></img>
      <div className="property-details">
        <h3>{property.name}</h3>
        <p>{property.description}</p>
        <p>Price: ${property.price}</p>
        <p>Location: {property.city + ', ' + property.state + ', ' + property.zip}</p>
        <p>{property.type}</p>
        <p>{property.num_bedrooms} Bedrooms</p>
        <p>{property.num_bathrooms} Bathrooms</p>
      </div>
      <div style={{ display: 'flex', margin: '30px', flexDirection: 'column' }}>
        <h3>Booking Information</h3>
        <div
          style={{
            display: 'flex',
            margin: '30px',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>
            Date: <h5>{currentIssueProperty?.booking?.date}</h5>
          </h3>
          <h3>
            Owner Email:
            <h5> {property.owneremail}</h5>
          </h3>

          <h3>
            Payment Status:{' '}
            <h5>{currentIssueProperty?.booking?.paymentTransactionStatus}</h5>
          </h3>
        </div>
      </div>

      <div
        className=""
        style={{
          margin: '30px',
        }}
      >
        <h3>Ticket Information</h3>
        <div
          className="ticket-selection"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '30px',
            border: '1px solid black',
            padding: '10px',
          }}
        >
          <Select
            options={issueTypeSelected}
            id="newProdutSelectOptions"
            onChange={(e) => {
              setSelectedIssueOption(e);
              console.log('Select Changed', e);
            }}
            placeholder="Select Issue Type"
            style={{
              width: '200px',
              margin: '10px',
              marginTop: '20px',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className="issue_label" style={{ marginBottom: '5px' }}>
              Issue Notes
            </label>
            <textarea
              style={{
                width: '200px',
                height: '100px',
              }}
              id="issue_notes"
              placeholder="Enter Your Concers, and Message for the admin"
            ></textarea>
          </div>
          <div className="property-buttons">
            <Button
              className="buynow_button"
              color="primary"
              backgroundcolor="primary"
              variant={'outlined'}
              style={{ cursor: 'pointer', marginTop: '30px', marginBottom: '30px' }}
              onClick={(e) => {
                submitIssue(e);
              }}
              href=""
            >
              Submit Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTicketPage;
