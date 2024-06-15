import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import logo from "../../shared/images/logo.png";
import HeroContainer from "../../shared/widgets/container/HeroContainer";
import GridContainer from "../../shared/widgets/container/GridContainer";
import GridItem from "../../shared/widgets/container/GridItem";
import { Formik } from "formik";
import BTextField from "../../shared/widgets/formik/BTextField";
import AuthService from "../../auth/AuthHelper";
import { Redirect } from "react-router-dom";
import { RoutePaths } from "../routePaths";
import { RegisterDuplicateUserFound } from "../../exception/RegisterDuplicateUserFound";
import { useSnackbar } from "notistack";
import { RegisterWrongPayload } from "../../exception/RegisterWrongPayload";
import { useTranslation } from "react-i18next";
import { useRegisterSchema } from "./register-validation";

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [redirectToUserConfirmation, setRedirectToUserConfirmation] = useState<
    boolean
  >(false);

  const registrationValidationSchema = useRegisterSchema();

  const initialFormikValues: RegisterProps = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleRegistration = async (formValues) => {
    try {
      await AuthService.register(formValues);
      enqueueSnackbar(t("registration.successful"), { variant: "success" });
      setRedirectToUserConfirmation(true);
    } catch (e) {
      if (e instanceof RegisterDuplicateUserFound) {
        enqueueSnackbar(t("doctor.already.registered"), {
          variant: "error",
          action: (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setRedirectToUserConfirmation(true)}
            >
              {t("login")}
            </Button>
          ),
        });
        return;
      }
      if (e instanceof RegisterWrongPayload) {
        enqueueSnackbar(t("invalid.data.send"), {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  if (redirectToUserConfirmation) {
    return <Redirect to={RoutePaths.USER_CONFIRMATION_PROMPT} />;
  }

  return (
    <HeroContainer maxWidth={"sm"}>
      <Box mb={"55px"}>
        <GridContainer justify={"center"}>
          <GridItem>
            <img src={logo} alt="logo" width={255} height={150} />
          </GridItem>
        </GridContainer>
      </Box>
      <Formik
        initialValues={initialFormikValues}
        validationSchema={registrationValidationSchema}
        onSubmit={handleRegistration}
      >
        {({ values, handleChange, submitForm }) => {
          return (
            <>
              <GridContainer>
                <GridItem xs={12} sm={6}>
                  <BTextField
                    id="username"
                    name="username"
                    label={t("username")}
                    autoComplete="name"
                    value={values.username}
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <BTextField
                    id="email"
                    name="email"
                    label={t("email")}
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </GridItem>

                <GridItem xs={12} sm={6}>
                  <BTextField
                    id="password"
                    name="password"
                    label={t("password")}
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <BTextField
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label={t("password.confirmation")}
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    type="password"
                  />
                </GridItem>
              </GridContainer>
              <Box mt={"15px"}>
                <GridContainer direction="column-reverse" alignItems="flex-end">
                  <GridItem>
                    <Button
                      onClick={submitForm}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {t("register")}
                    </Button>
                  </GridItem>
                </GridContainer>
              </Box>
            </>
          );
        }}
      </Formik>
    </HeroContainer>
  );
};

export default Register;
