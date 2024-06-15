import React from "react";
import { useStyles } from "./dashboard-styles";
import { Container, CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import PatientCreate from "../../pages/patient/create/PatientCreate";
import PatientShow from "../../pages/patient/show/PatientShow";
import PatientIndex from "../../pages/patient/index/PatientIndex";
import { RoutePaths } from "../routePaths";
import DiagnosisCodeIndex from "../../pages/diagnosisCode/index/DiagnosisCodeIndex";

function Dashboard() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.container}>
          <Switch>
            <Route
              exact
              path={RoutePaths.PATIENT_INDEX}
              component={PatientIndex}
            />
            <Route
              exact
              path={RoutePaths.PATIENT_CREATE_PAGE}
              component={PatientCreate}
            />
            <Route exact path={"/patient/:id"} component={PatientShow} />
            <Route
              exact
              path={RoutePaths.DIAGNOSIS_CODE_INDEX}
              component={DiagnosisCodeIndex}
            />
            <Route exact path={RoutePaths.HOME} component={PatientIndex} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
