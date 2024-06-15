import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { RoutePaths } from "../routePaths";
import { PromptUser } from "../../pages/user-confirmation/PromptUser";
import { ResendConfirmation } from "../../pages/user-confirmation/ResendConfirmation";
import { ActivateUser } from "../../pages/user-confirmation/ActivateUser";

export const UserConfirmation = (): JSX.Element => {
  return (
    <div>
      <main>
        <Container>
          <Switch>
            <Route
              exact
              path={RoutePaths.USER_CONFIRMATION_PROMPT}
              component={PromptUser}
            />
            <Route
              exact
              path={RoutePaths.USER_CONFIRMATION_ACTIVATE}
              component={ActivateUser}
            />
            <Route
              exact
              path={RoutePaths.USER_CONFIRMATION_RESEND}
              component={ResendConfirmation}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
};
