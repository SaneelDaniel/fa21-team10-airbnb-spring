import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth />
      </header>
    </div>
  );
}

export default App;
