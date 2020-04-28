//the PrivateRoute component wraps the CreateOrEdit component and verifies that the user is logged in before rendering CreateOrEdit. if not logged in, the user is shown the Error component.
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
      render={(props) =>
        loggedIn ? (
          <PrivateComponent {...props} {...rest} />
        ) : (
          <Error {...props} {...rest} />
        )
      }
    />
  );
};

export default PrivateRoute;
