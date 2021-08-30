import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Navbar from "./Components/Navbar/Navbar";
import Backdrop from "./Components/Navbar/Backdrop";
import SideDrawer from "./Components/Navbar/SideDrawer";
import Product_info from "./Components/Product/Product_info";
import Signup from "./Components/User/Signup";
import Signin from "./Components/User/Signin";

function App() {
  const [sideToogle, setSideToogle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToogle(true)} />
      <SideDrawer show={sideToogle} click={() => setSideToogle(false)} />
      <Backdrop show={sideToogle} click={() => setSideToogle(false)} />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={Product_info} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
