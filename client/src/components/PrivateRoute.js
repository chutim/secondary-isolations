import React from "react";
import { Route } from "react-router-dom";
import Error from "./Error";

const PrivateRoute = ({
  component: PrivateComponent,
  path,
  loggedIn,
  ...rest
}) => {
  return (
    <Route
      path={path}
      render={props =>
        loggedIn ? (
          <PrivateComponent {...props} {...rest} />
        ) : (
          //Error component shouldn't ever show up in normal use (because the 'edit' and 'create' buttons shouldn't even render), only if the user tries to access the component directly through URL
          <Error />
        )
      }
    />
  );
};

export default PrivateRoute;
