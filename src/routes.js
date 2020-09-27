import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Folder from "./pages/Folder";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/pasta" component={Folder} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
