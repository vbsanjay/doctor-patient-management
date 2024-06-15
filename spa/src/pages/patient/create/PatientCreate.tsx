import React, { useState } from "react";
import GridItem from "../../../shared/widgets/container/GridItem";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import GridContainerItem from "../../../shared/widgets/container/GridContainerItem";
import { Formik } from "formik";
import BTextField from "../../../shared/widgets/formik/BTextField";
import { patientApi, PatientStoreRequest } from "../../../api/patientApi";
import * as HttpStatus from "http-status-codes";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";
import { RoutePaths } from "../../../routes/routePaths";

import { usePatientCreateValidationSchema } from "./patient-create-validation";
import { PatientDto } from "../../../endpoints";
import { useTranslation } from "react-i18next";

const PatientCreate: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [redirectToShowPatientPage, setRedirectToShowPatientPage] = useState(
    false
  );
  const [patientId, setPatientId] = useState<number | null>(null);
  const validationSchema = usePatientCreateValidationSchema();

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  };

  const handleOnSubmit = async (values: PatientStoreRequest): Promise<void> => {
    const response = await patientApi.storePatient(values);
    const patient: PatientDto = await response.json();
    setPatientId(patient.id);
    if (response.status === HttpStatus.BAD_REQUEST) {
      enqueueSnackbar(t("patient.duplicate"), {
        variant: "success",
        persist: false,
        action: (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRedirectToShowPatientPage(true)}
          >
            {t("open.patient")}
          </Button>
        ),
      });
      return;
    }
    if (response.status === HttpStatus.CONFLICT) {
      enqueueSnackbar(t("patient", { patient }), {
        variant: "info",
        persist: false,
        action: (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRedirectToShowPatientPage(true)}
          >
            {t("open.patient")}
          </Button>
        ),
      });
      return;
    }
    if (response.status === HttpStatus.OK) {
      enqueueSnackbar(t("patient.added"), {
        variant: "success",
        persist: false,
        action: (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRedirectToShowPatientPage(true)}
          >
            {t("open.patient")}
          </Button>
        ),
      });
      return;
    }
  };

  if (redirectToShowPatientPage) {
    return <Redirect to={RoutePaths.PATIENT_SHOW(patientId)} />;
  }

  return (
    <>
      <GridContainerItem>
        <GridItem>
          <Typography variant="h6">{t("add.new.patient")}</Typography>
        </GridItem>
      </GridContainerItem>

      <Divider />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: PatientStoreRequest) => handleOnSubmit(values)}
        render={({ submitForm }) => {
          return (
            <Box marginTop={5}>
              <GridContainerItem md={6}>
                <GridItem>
                  <BTextField name="firstName" label={t("firstname")} />
                </GridItem>
                <GridItem>
                  <BTextField name="lastName" label={t("lastname")} />
                </GridItem>
                <GridItem>
                  <BTextField name="phone" label={t("telephone.number")} />
                </GridItem>
                <GridItem>
                  <BTextField name="email" type="email" label={t("email")} />
                </GridItem>
                <GridItem>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    onClick={submitForm}
                  >
                    {t("add")}
                  </Button>
                </GridItem>
              </GridContainerItem>
            </Box>
          );
        }}
      />
    </>
  );
};

export default PatientCreate;
