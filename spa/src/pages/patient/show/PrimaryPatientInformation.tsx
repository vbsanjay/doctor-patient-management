import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
} from "@material-ui/core";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import CallTwoToneIcon from "@material-ui/icons/CallTwoTone";
import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import { patientApi } from "../../../api/patientApi";
import { CenteredTypography } from "../../../shared/widgets/typography/CenteredTypography";
import { Formik, FormikHelpers } from "formik";
import BTextField from "../../../shared/widgets/formik/BTextField";
import GridItem from "../../../shared/widgets/container/GridItem";
import GridContainerItem from "../../../shared/widgets/container/GridContainerItem";
import { usePatientValidationSchema } from "./PatientValidation";
import { useSnackbar } from "notistack";
import GridContainer from "../../../shared/widgets/container/GridContainer";
import { nameOf } from "../../../nameOf";
import { PatientDto } from "../../../endpoints";
import { useTranslation } from "react-i18next";

interface PrimaryPatientInformationProps {
  patient: PatientDto;
  updatePatient: () => Promise<void>;
}

const PrimaryPatientInformation: React.FC<PrimaryPatientInformationProps> = ({
  patient,
  updatePatient,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const { t } = useTranslation();

  const renderNameField = () => {
    if (isEditModeEnabled) {
      return (
        <>
          <GridContainerItem>
            <GridItem xs={6}>
              <BTextField
                name={nameOf<PatientDto>("firstName")}
                placeholder={t("firstname")}
                value={patient.firstName}
              />
            </GridItem>
            <GridItem xs={6}>
              <BTextField
                name={nameOf<PatientDto>("lastName")}
                placeholder={t("lastname")}
                value={patient.lastName}
              />
            </GridItem>
          </GridContainerItem>
        </>
      );
    }
    return (
      <Typography variant="h6" component="h6">
        {patient.fullName}
      </Typography>
    );
  };

  const renderPhoneField = () => {
    if (isEditModeEnabled) {
      return (
        <BTextField
          name="phone"
          placeholder={t("telephone.number")}
          value={patient.phone}
        />
      );
    }
    return (
      <>
        <br />
        <CenteredTypography variant="body1">
          <CallTwoToneIcon fontSize="small" />
          {patient.phone}
        </CenteredTypography>
      </>
    );
  };

  const renderEmailField = () => {
    if (isEditModeEnabled) {
      return (
        <BTextField
          name="email"
          placeholder={t("email")}
          value={patient?.email}
        />
      );
    }
    if (patient?.email) {
      return (
        <>
          <br />
          <CenteredTypography variant="body1">
            <EmailTwoToneIcon fontSize="small" />
            {patient?.email}
          </CenteredTypography>
        </>
      );
    }
    return null;
  };

  const renderNoteField = () => {
    if (isEditModeEnabled) {
      return (
        <BTextField
          multiline
          name="note"
          placeholder={t("note")}
          value={patient?.note}
        />
      );
    }
    if (patient?.note) {
      return (
        <>
          <br />
          <CenteredTypography variant="body1">
            <CommentTwoToneIcon fontSize="small" />
            {patient?.note}
          </CenteredTypography>
        </>
      );
    }
    return null;
  };

  const renderActionButtons = (
    submitForm: FormikHelpers<PatientDto>["submitForm"]
  ) => {
    const actionButtons: JSX.Element[] = [];
    if (isEditModeEnabled) {
      actionButtons.push(
        <GridItem key={1} xs={6}>
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={() => {
              submitForm();
              setIsEditModeEnabled(!isEditModeEnabled);
            }}
          >
            {t("save")}
          </Button>
        </GridItem>
      );
    }
    actionButtons.push(
      <GridItem key={2} xs={6}>
        <Button
          key={2}
          color="primary"
          variant="contained"
          onClick={() => setIsEditModeEnabled(!isEditModeEnabled)}
        >
          {isEditModeEnabled ? t("cancel") : t("update")}
        </Button>
      </GridItem>
    );
    return <GridContainer spacing={1}>{actionButtons}</GridContainer>;
  };

  return (
    <Formik
      initialValues={patient}
      validationSchema={usePatientValidationSchema()}
      onSubmit={async (values) => {
        await patientApi.updatePatient(values);
        updatePatient();
        enqueueSnackbar(t("patient.updated"), {
          variant: "success",
        });
      }}
    >
      {({ submitForm }) => {
        return (
          <Card>
            <CardHeader
              title={t("patient.primary.information")}
              titleTypographyProps={{
                variant: "subtitle1",
                color: "textSecondary",
              }}
              action={renderActionButtons(submitForm)}
            />
            <CardContent>
              {renderNameField()}
              {renderPhoneField()}
              {renderEmailField()}
              {renderNoteField()}
            </CardContent>
          </Card>
        );
      }}
    </Formik>
  );
};

export default PrimaryPatientInformation;
