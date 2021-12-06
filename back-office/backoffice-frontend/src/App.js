import "./App.css";
import Auth from "./Auth";
import Home from "./Home";
import { Router, Route, Switch } from "react-router";
import { useContext } from "react";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Switch>
          <Route exact path="/home" component = {Home} />
          <Route exact path="/login" component = {Auth} />
      </Switch>
      </Router> */}
      <Home />
    
    </div>
  );
}

export default App;
