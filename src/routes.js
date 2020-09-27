import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Folder from "./pages/Folder";

function Routes() {
  const userData = sessionStorage.getItem("user");
  const user = JSON.parse(userData);
  console.log(user);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Auth} />
        {user ? (
          <Route path="/" exact component={Home} />
        ) : (
          <Redirect to="/login" />
        )}
        {user ? (
          <Route path="/home" exact component={Home} />
        ) : (
          <Redirect to="/login" />
        )}
        {user ? (
          <Route path="/folder" exact component={Folder} />
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
