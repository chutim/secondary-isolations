import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: PrivateComponent, path, ...rest }) => {
  const isAuthenticated = !true;
  console.log("passing thru privateroute");
  //authentication logic here, to modify isAuthenticated

  return (
    <Route
      path={path}
      render={props =>
        isAuthenticated ? (
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
