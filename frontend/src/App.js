import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import SearchPage from './SearchPage';
import Register from './Register';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AppState from './State/AppContext';
import PropertPage from './PropertyPage';
import OrderHistory from './OrderHistory';
import api from "./State/Api"
function App() {
  const context = useContext(AppState);

  useEffect(() => {
    // getPropertyData();
    api.fetchProperties()
    .then(data => context.SET_PROPERTY_DATA(data));
  }, []);

  const getPropertyData = async () => {
    
    console.log('getPropertyData getting data');
    const response = await axios
      .get('http://localhost:8080/property/all')
      .then((res) => {
        if (res.data != null) {
          // setData(res.data.slice(0, 3));
          context.SET_PROPERTY_DATA(res.data);
          localStorage.setItem('property1', JSON.stringify(res.data[0]));
        } else console.log('error');
      })
      .catch((err) => {
        console.log('Error in Fetching Properties', err);
      });
  };
  return (
    // BEM
    <div className="app">
      <Router>
        <Header />

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/property" component={PropertPage} />
          <Route path="/home" component={Home} />
          <Route path="/orderhistory" component={OrderHistory} />
          <Route path="/">
            <Login />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
