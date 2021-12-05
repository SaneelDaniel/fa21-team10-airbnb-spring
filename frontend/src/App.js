import React from "react";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import SearchPage from "./SearchPage";
import Register from "./Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
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
          <Route path="/">
            <Register />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
