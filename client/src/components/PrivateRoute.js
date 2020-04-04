import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: PrivateComponent,
  path,
  loggedIn,
  ...rest
}) => {
  console.log("passing thru privateroute");
  //should authenticate with server here. if i just check for a loggedIn status on App.js, a user could just modify their localStorage to be loggedIn, and then have full access. don't pass in loggedIn here as props.
  //actually... maybe jsut don't store loggedIn on localStorage. then the user can't modify the state i think.

  return (
    <Route
      path={path}
      render={props =>
        loggedIn ? (
          <PrivateComponent {...props} {...rest} />
        ) : (
          //Error component shouldn't ever show up in normal use (because the 'edit' and 'create' buttons shouldn't even render), only if the user tries to access the component directly through URL
          <Redirect to="/error" />
        )
      }
    />
  );
};

export default PrivateRoute;
