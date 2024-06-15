import React, { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import logo from "../../shared/images/logo.png";
import { Formik } from "formik";
import { useStyles } from "./login-styles";
import { useLoginSchema } from "./login-validation";
import BTextField from "../../shared/widgets/formik/BTextField";
import { useSnackbar } from "notistack";
import HeroContainer from "../../shared/widgets/container/HeroContainer";
import { Redirect } from "react-router-dom";
import GridItem from "../../shared/widgets/container/GridItem";
import GridContainerItem from "../../shared/widgets/container/GridContainerItem";
import GridContainer from "../../shared/widgets/container/GridContainer";
import { UserContext } from "../../contexts/UserContextProvider";
import { RoutePaths } from "../routePaths";
import { UserLoginRequestDto } from "../../endpoints";
import { useTranslation } from "react-i18next";
import { StatusCodes } from "http-status-codes";

const Login = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const { logIn, resendConfirmation } = useContext(UserContext);
  const { t } = useTranslation();
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<any>(
    () => false
  );
  const [
    redirectToResendConfirmation,
    setRedirectToResendConfirmation,
  ] = useState(false);
  const classes = useStyles();
  const validationSchema = useLoginSchema();

  const initialFormikValues: UserLoginRequestDto = {
    email: "",
    password: "",
  };

  const handleResendConfirmation = (userEmail) => {
    resendConfirmation(userEmail).then((response) => {
      if (response.ok) {
        setRedirectToResendConfirmation(true);
        return <Redirect to={RoutePaths.USER_CONFIRMATION_PROMPT} />;
      }
      enqueueSnackbar(t("confirmation.resend.failed" + ""), {
        variant: "error",
      });
    });
  };

  const handleSubmit = async ({ email, password }: UserLoginRequestDto) => {
    try {
      await logIn(email, password);
      setRedirectToReferrer(true);
    } catch (response) {
      if (response.status === StatusCodes.UNAUTHORIZED) {
        enqueueSnackbar(t("profile.not.activated"), {
          variant: "error",
          action: (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleResendConfirmation(email)}
            >
              {t("activate")}
            </Button>
          ),
        });
        return;
      }
      if (response.status === StatusCodes.FORBIDDEN) {
        enqueueSnackbar(t("login.failed"), {
          variant: "error",
        });
        return;
      }
    }
  };

  if (redirectToResendConfirmation) {
    return <Redirect to={RoutePaths.USER_CONFIRMATION_PROMPT} />;
  }

  if (redirectToReferrer) {
    return <Redirect to={RoutePaths.HOME} />;
  }

  return (
    <HeroContainer maxWidth={"sm"}>
      <GridContainer>
        <GridContainerItem xs={12} justify={"center"}>
          <img src={logo} alt="Logo" width={255} height={150} />
        </GridContainerItem>
        <Formik
          initialValues={initialFormikValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, submitForm }) => (
            <>
              <GridContainerItem xs={12} className={classes.formikContainer}>
                <GridItem xs={12} sm={6}>
                  <BTextField
                    autoComplete="email"
                    id="email"
                    name="email"
                    label={t("email")}
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth={true}
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <BTextField
                    autoComplete="current-password"
                    id="password"
                    name="password"
                    label={t("password")}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    fullWidth={true}
                  />
                </GridItem>
                <Grid item xs={12} className={classes.submitContainer}>
                  <Button
                    onClick={submitForm}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {t("login")}
                  </Button>
                </Grid>
              </GridContainerItem>
            </>
          )}
        </Formik>
      </GridContainer>
    </HeroContainer>
  );
};

export default Login;
