import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Dashboard from "./routes/dashboard/Dashboard";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core";
import { ThemeProvider as StyleComponentsThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { RoutePaths } from "./routes/routePaths";
import GlobalErrorHandler from "./exception/GlobalErrorHandler";
import UserContextProvider from "./contexts/UserContextProvider";
import PrivateRoute from "./auth/PrivateRoute";
import { UserConfirmation } from "./routes/user-confirmation/UserConfirmation";

const App = (): any => {
  return (
    <GlobalErrorHandler>
      <ThemeProvider theme={theme}>
        <StyleComponentsThemeProvider theme={theme}>
          <SnackbarProvider>
            <UserContextProvider>
              <Router>
                <Switch>
                  <Route path={RoutePaths.LOGIN} component={Login} />
                  <Route path={RoutePaths.REGISTER} component={Register} />
                  <Route
                    path={RoutePaths.USER_CONFIRMATION_INDEX}
                    component={UserConfirmation}
                  />
                  <Route
                    path={RoutePaths.HOME}
                    component={() => <PrivateRoute component={Dashboard} />}
                  />
                </Switch>
              </Router>
            </UserContextProvider>
          </SnackbarProvider>
        </StyleComponentsThemeProvider>
      </ThemeProvider>
    </GlobalErrorHandler>
  );
};

export default App;
