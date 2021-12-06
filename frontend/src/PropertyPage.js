import React, { useEffect } from 'react';
import './PropertyPage.css';
import { Button } from '@material-ui/core';
import SearchResult from './SearchResult';
import AppState from './State/AppContext';
import axios from 'axios';
import api from './State/Api';
import { useHistory } from 'react-router';

function PropertyPage() {
  const context = React.useContext(AppState);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [paymentClicked, setPaymentClicked] = React.useState(false);
  const history = useHistory();
  const property = context.currentProperty;
  useEffect(() => {}, []);

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

  const onSubmitPayment = async (event) => {
    event.preventDefault();

    var hasErr = await verifyFormDetails();
    if (hasErr) {
      setPaymentClicked(false);
      return;
    } else {
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
        ordernumber: '',
        propertyid: property.id,
        transactionamount: '30',
        transactioncurrency: 'USD',
        authid: 'none',
        authstatus: 'none',
        captureid: 'none',
        capturestatus: 'none',
      };
      api
        .postPayment(tempPaymentModel)
        .then(async (res) => {
          console.log(res);
          await api
            .fetchProperties()
            .then((data) => {
              context.SET_PROPERTY_DATA(data);
            })
            .catch((err) => {
              console.log(err);
            });
          history.push('/orderhistory');
        })
        .catch((e) => {
          setPaymentClicked(false);
          console.log('ERROR');
        });
    }
  };

  const verifyFormDetails = async () => {
    var hasErr = false;
    if (
      firstname === '' ||
      lastname === '' ||
      address === '' ||
      city === '' ||
      state === '' ||
      zip === '' ||
      phonenumber === '' ||
      cardnumber === '' ||
      expmonth === '' ||
      expyear === '' ||
      cvv === '' ||
      email === ''
    ) {
      setPaymentClicked(false);
      alert('Please fill out all fields');
      hasErr = true;
    } else {
      let phoneRegex = new RegExp('[(]\\d{3}[)] \\d{3}-\\d{4}');

      if (phoneRegex.test(phonenumber) === false) {
        setPaymentClicked(false);
        alert('Please enter a valid phone number (xxx) xxx-xxxx)');
        console.log('Phone number is not valid');
        hasErr = true;
      }

      let cardRegex = new RegExp('((?:(?:\\d{4}[- ]){3}\\d{4}|\\d{16}))(?![\\d])');
      if (!cardRegex.test(cardnumber)) {
        alert(
          `Please enter the card number in the format xxxx xxxx xxxx xxxx ${cardnumber}`
        );
        hasErr = true;
      }

      let zipRegex = new RegExp('^d{5}$');
      if (zipRegex.test(zip)) {
        alert(`Please enter the zip code in the format xxxxx ${zip}`);
        hasErr = true;
      }

      let cvvRegex = new RegExp('^[0-9]{3, 4}$');
      if (cvvRegex.test(cvv)) {
        alert(`Please enter the cvv in the format xxx ${cvv}`);
        hasErr = true;
      }
    }
    return hasErr;
  };

  if (!property) {
    return <h1>Unavailable</h1>;
  }

  return (
    <div className="property-page">
      <img src={property?.image}></img>
      <div className="property-details">
        <div className="property-details-data">
          <h3>{property.name}</h3>
          <h3>{property.description}</h3>
          <h3>Price: ${property.price}</h3>
          <h3>Location: {property.city + ', ' + property.state + ', ' + property.zip}</h3>
          <h3>{property.type}</h3>
          <h3>{property.num_bedrooms} Bedrooms</h3>
          <h3>{property.num_bathrooms} Bathrooms</h3>
          <h5>Owner: {property.ownername}</h5>
          <h5>Owner Email: {property.owneremail}</h5>
        </div>
      </div>

      <div className="property-buttons">
        <Button
          className="buynow_button"
          color="primary"
          backgroundColor="primary"
          variant={openPayment ? 'outlined' : 'contained'}
          style={{ cursor: 'pointer', marginTop: '30px', marginBottom: '30px' }}
          onClick={() => {
            setOpenPayment(!openPayment);
          }}
          href=""
        >
          {openPayment ? 'Close Checkout' : 'Checkout'}
        </Button>

        {openPayment && (
          <div className="payment_form">
            <label className="detail_input">
              First Name:
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </label>

            <label className="detail_input">
              Last Name:
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </label>

            <label className="detail_input">
              Card Number
              <input
                type="text"
                name="card_number"
                placeholder="1234 56678 9012 3456"
                value={cardnumber}
                onChange={(e) => {
                  setCardnumber(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              Expiration Month
              <input
                type="text"
                name="expiration_date"
                placeholder="December"
                value={expmonth}
                onChange={(e) => {
                  setExpmonth(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              Expiration Year
              <input
                type="text"
                name="expiration_date"
                placeholder="2020"
                value={expyear}
                onChange={(e) => {
                  setExpyear(e.target.value);
                }}
              />
            </label>

            <label className="detail_input">
              CVV
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => {
                  setCvv(e.target.value);
                }}
              />
            </label>

            <label className="detail_input">
              St Address:
              <input
                type="text"
                name="address"
                placeholder="1234 Main St"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              City:
              <input
                type="text"
                name="city"
                placeholder="San Jose"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              State:
              <input
                type="text"
                name="state"
                placeholder="CA"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              Zip:
              <input
                type="text"
                name="zip"
                placeholder="95131"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              Phone Number:
              <input
                type="text"
                name="phonenumber"
                placeholder="(123) 456-7890"
                value={phonenumber}
                onChange={(e) => {
                  setPhonenumber(e.target.value);
                }}
              />
            </label>
            <label className="detail_input">
              Email:
              <input
                type="text"
                name="email"
                placeholder="abc@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
          </div>
        )}
        {openPayment && (
          <Button
            className="paynow_button"
            variant={'contained'}
            disabled={paymentClicked}
            style={{ cursor: 'pointer', marginTop: '30px', marginBottom: '30px' }}
            onClick={(e) => {
              setPaymentClicked(true);
              onSubmitPayment(e);
            }}
            href=""
          >
            Pay Now
          </Button>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;
