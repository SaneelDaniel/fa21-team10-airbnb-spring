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
  const [openPayment, setOpenPayment] = React.useState(false);
  const [paymentClicked, setPaymentClicked] = React.useState(false);
  const history = useHistory();
  const property = context.currentIssueProperty.property;
  useEffect(() => {
    console.log(context);
    console.log(property, 'Property Page');
  }, []);
  const issueTypeSelected = [
    { value: '1', label: 'Issue' },
    { value: '2', label: 'Request' },
  ];

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

      <div className="">
        <h3>Ticket Information</h3>
        <div
          className="ticket-selection"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Select
            options={issueTypeSelected}
            id="newProdutSelectOptions"
            onChange={(e) => {}}
          />
        </div>
      </div>

      <div className="property-buttons">
        <Button
          className="buynow_button"
          color="primary"
          backgroundcolor="primary"
          variant={openPayment ? 'outlined' : 'contained'}
          style={{ cursor: 'pointer', marginTop: '30px', marginBottom: '30px' }}
          onClick={() => {
            setOpenPayment(!openPayment);
          }}
          href=""
        >
          Checkout
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default OrderTicketPage;
