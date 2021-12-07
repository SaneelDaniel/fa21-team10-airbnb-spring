import "./App.css";
import Auth from "./Auth";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import AppState from "./State/AppContext";

function App() {
  const context = useContext(AppState);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
