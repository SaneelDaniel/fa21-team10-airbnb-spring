import React, { useEffect } from 'react';
import './PropertyPage.css';
import { Button } from '@material-ui/core';
import SearchResult from './SearchResult';
import AppState from './State/AppContext';
import axios from 'axios';
import api from "./State/Api";
import { useHistory } from 'react-router';

function PropertyPage() {
  const context = React.useContext(AppState);
  const [openPayment, setOpenPayment] = React.useState(false);
  const history = useHistory();
  const property = context.currentProperty;
  useEffect(() => {
    console.log(context)
    console.log(property, 'Property Page');
  }, []);

  /**
   * Create state value holders for 
   * private String userid;
    private String firstname;
    private String lastname;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String phonenumber;
    private String cardnumber;
    private String expmonth;
    private String expyear;
    private String cvv;
    private String email;
    private String notes;

    private String ordernumber;
    private String propertyid;
    private String transactionamount;
    private String transactioncurrency;
    private String authid;
    private String authstatus;
    private String captureid;
    private String capturestatus;
   */
  const [userid, setUserid] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [cardnumber, setCardnumber] = React.useState('');
  const [expmonth, setExpmonth] = React.useState('');
  const [expyear, setExpyear] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const onSubmitPayment = (event) => {
    event.preventDefault();
    console.log(
      userid,
      firstname,
      lastname,
      address,
      city,
      state,
      zip,
      phonenumber,
      cardnumber,
      expmonth,
      expyear,
      cvv,
      email,
      notes
    );

    var formDat = new FormData();
    formDat.append('userid', '01');
    formDat.append('firstname', firstname);
    formDat.append('lastname', lastname);
    formDat.append('address', address);
    formDat.append('city', city);
    formDat.append('state', state);
    formDat.append('zip', zip);
    formDat.append('phonenumber', phonenumber);
    formDat.append('cardnumber', cardnumber);
    formDat.append('expmonth', expmonth);
    formDat.append('expyear', expyear);
    formDat.append('cvv', cvv);
    formDat.append('email', email);
    formDat.append('notes', notes);
    formDat.append('ordernumber', '');
    formDat.append('propertyid', property.id);
    formDat.append('transactionamount', 30);
    formDat.append('transactioncurrency', 'USD');
    formDat.append('authid', '');
    formDat.append('authstatus', '');
    formDat.append('captureid', '');
    formDat.append('capturestatus', '');

    const PaymentModel = {
      userid: '01',
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      state: state,
      zip: zip,
      phonenumber: phonenumber,
      cardnumber: cardnumber,
      expmonth: expmonth,
      expyear: expyear,
      cvv: cvv,
      email: email,
      notes: 'No Note',
      ordernumber: '',
      propertyid: property.id,
      transactionamount: 30,
      transactioncurrency: 'USD',
      authid: '',
      authstatus: '',
      captureid: '',
      capturestatus: '',
    };

    const tempPaymentModel = {
      userid: '01',
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      state: state,
      zip: zip,
      phonenumber: phonenumber,
      cardnumber: cardnumber,
      expmonth: expmonth,
      expyear: expyear,
      cvv: cvv,
      email: email,
      notes: 'No Note',
      ordernumber: '001',
      propertyid: property.id,
      transactionamount: '30',
      transactioncurrency: 'USD',
      authid: 'none',
      authstatus: 'none',
      captureid: 'none',
      capturestatus: 'none',
    };
    api.postPayment(tempPaymentModel)
    .then(res =>{
      console.log(res)
      history.push('/orderhistory')
    })
    .catch(e => console.log("ERROR"))
    // axios
    //   .post('http://localhost:8083/payments/newPayment', tempPaymentModel)
    //   .then((res) => {
    //     console.log('Payment Response: ', res);
    //   })
    //   .catch((err) => {
    //     console.log('Payment Error: ', err);
    //   });
  };

  if (!property) {
    return <h1>Unavailable</h1>
  }

  return (
    <div className="property-page">
      <p>Property Page</p>
      <p>{JSON.stringify(property)}</p>
      <img src={property?.image}></img>
      <div className="property-details">
        <h3>{property.name}</h3>
        <p>{property.description}</p>
        <p>Price: ${property.price}</p>
        <p>Locatin: {property.city + ', ' + property.state + ', ' + property.zip}</p>
        <p>{property.type}</p>
        <p>{property.num_bedrooms} Bedrooms</p>
        <p>{property.num_bathrooms} Bathrooms</p>
        <h4>Owner: {property.ownername}</h4>
        <h4>Owner Email: {property.owneremail}</h4>
      </div>

      <div className="property-buttons">
        <Button
          style={{ cursor: 'pointer', marginTop: '30px', marginBottom: '30px' }}
          onClick={() => {
            setOpenPayment(!openPayment);
          }}
          href=""
        >
          Buy Now
        </Button>

        {openPayment && (
          <div className="payment_form">

            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </label>

            <label>
              Card Number
              <input
                type="text"
                name="card_number"
                value={cardnumber}
                onChange={(e) => {
                  setCardnumber(e.target.value);
                }}
              />
            </label>
            <label>
              Expiration Month
              <input
                type="text"
                name="expiration_date"
                value={expmonth}
                onChange={(e) => {
                  setExpmonth(e.target.value);
                }}
              />
            </label>
            <label>
              Expiration Year
              <input
                type="text"
                name="expiration_date"
                value={expyear}
                onChange={(e) => {
                  setExpyear(e.target.value);
                }}
              />
            </label>

            <label>
              CVV
              <input
                type="text"
                name="cvv"
                value={cvv}
                onChange={(e) => {
                  setCvv(e.target.value);
                }}
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </label>
            <label>
              Zip:
              <input
                type="text"
                name="zip"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phonenumber"
                value={phonenumber}
                onChange={(e) => {
                  setPhonenumber(e.target.value);
                }}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>

            <Button
              style={{ cursor: 'pointer', marginTop: '30px', marginBottom: '30px' }}
              onClick={(e) => {
                onSubmitPayment(e);
              }}
              href=""
            >
              Pay Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 
 *  private String userid;
    private String firstname;
    private String lastname;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String phonenumber;
    private String cardnumber;
    private String expmonth;
    private String expyear;
    private String cvv;
    private String email;
    private String notes;

    private String ordernumber;
    private String propertyid;
    private String transactionamount;
    private String transactioncurrency;
    private String authid;
    private String authstatus;
    private String captureid;
    private String capturestatus;
 */

export default PropertyPage;
