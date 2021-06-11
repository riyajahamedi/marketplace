import "./App.css";
import { Navbar } from "./components/Navbar";
import MarketPlaceContainer from "./containers/MarketPlaceContainer";
import EditProductContainer from "./containers/EditProductContainer";
import ViewProductContainer from "./containers/ViewProductContainer";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar brand="XCart" />
      <Router>
        <Switch>
          <Route exact path="/" component={MarketPlaceContainer} />
          <Route path="/view" component={ViewProductContainer} />
          <Route path="/edit" component={EditProductContainer} />
        </Switch>
      </Router>
      <footer></footer>
    </>
  );
};

export default App;
