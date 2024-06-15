import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthService } from "./index";
import { RoutePaths } from "../routes/routePaths";

const PrivateRoute = ({
  component: Component,
  ...rest
}): JSX.Element | null => {
  const [isUserLogged, setIsUserLogged] = useState<boolean | undefined>(
    () => undefined
  );

  useEffect(() => {
    AuthService.isLogged().then((userStatus: boolean) =>
      setIsUserLogged(userStatus)
    );
  }, []);

  if (isUserLogged === undefined) {
    return null;
  }

  if (!isUserLogged) {
    return (
      <Redirect
        to={{
          pathname: RoutePaths.LOGIN,
          state: { from: rest.location },
        }}
      />
    );
  }

  return <Route {...rest} render={() => <Component {...rest} />} />;
};

export default PrivateRoute;
