import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core";
import { CenteredTypography } from "../../../../shared/widgets/typography/CenteredTypography";
import { patientApi } from "../../../../api/patientApi";
import { useSnackbar } from "notistack";
import { RoutePaths } from "../../../../routes/routePaths";
import { useHistory } from "react-router-dom";
import RemovePatientConfirmationModal from "./RemovePatientConfirmationModal";
import { PatientDto } from "../../../../endpoints";
import { useTranslation } from "react-i18next";

interface SecondaryPatientInformationProps {
  patient: PatientDto;
}

const SecondaryPatientInformation: React.FC<SecondaryPatientInformationProps> = ({
  patient,
}) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleClose = () => setOpen(false);

  const handleAccept = async () => {
    await patientApi.deletePatient(patient.id);
    setOpen(false);
    enqueueSnackbar(t("patient.removed"), {
      variant: "info",
    });
    history.push(RoutePaths.PATIENT_INDEX);
  };

  return (
    <Card>
      <RemovePatientConfirmationModal
        open={open}
        handleClose={handleClose}
        handleAccept={handleAccept}
      />

      <CardHeader
        title={t("patient.secondary.information")}
        titleTypographyProps={{
          variant: "subtitle1",
          color: "textSecondary",
        }}
        action={
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
          >
            {t("remove")}
          </Button>
        }
      />
      <CardContent>
        <Typography variant="body1">
          {t("created")} {patient?.createdAt}
        </Typography>
        <br />
        <CenteredTypography variant="body1">
          {t("last.updated")} {patient?.updatedAt}
        </CenteredTypography>
      </CardContent>
    </Card>
  );
};

export default SecondaryPatientInformation;
