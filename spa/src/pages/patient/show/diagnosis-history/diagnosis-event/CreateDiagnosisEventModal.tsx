import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { diagnosisHistoryApi } from "../../../../../api/diagnosisHistoryApi";
import DiagnosisCodeAutocomplete from "../../../../../shared/widgets/autocomplete/DiagnosisCodeAutocomplete";
import BTextField from "../../../../../shared/widgets/formik/BTextField";
import { useDiagnosisHistoryValidationSchema } from "../DiagnosisHistoryValidation";
import { DiagnosisHistoryDto, PatientDto } from "../../../../../endpoints";
import { useTranslation } from "react-i18next";

interface CreateDiagnosisEventModalProps {
  updatePatientDiagnosisHistory: () => void;
  patient: PatientDto;
  handleToggleModal: () => void;
  open: boolean;
}

const CreateDiagnosisEventModal: React.FC<CreateDiagnosisEventModalProps> = ({
  updatePatientDiagnosisHistory,
  patient,
  handleToggleModal,
  open,
}: CreateDiagnosisEventModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const initialValues: DiagnosisHistoryDto = {
    id: undefined,
    patientId: patient.id,
    diagnosisCode: {
      id: undefined,
      code: "",
      disease: "",
      fullDiagnosis: "",
    },
    doctorsDiagnosis: "",
    therapy: "",
    referral: "",
    anamnesis: "",
    control: "",
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleToggleModal}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={useDiagnosisHistoryValidationSchema()}
          onSubmit={(values) => {
            diagnosisHistoryApi
              .createDiagnosisHistory(values)
              .then(() => {
                updatePatientDiagnosisHistory();
                handleToggleModal();
              })
              .catch((e) => {
                // todo bubble up
                enqueueSnackbar(e.message, {
                  variant: "error",
                  persist: false,
                });
              });
          }}
        >
          {({ submitForm }) => {
            return (
              <>
                <DialogTitle id="form-dialog-title">
                  {t("diagnosis.add")}
                </DialogTitle>
                <DialogContent>
                  <DiagnosisCodeAutocomplete />
                  <BTextField
                    name="doctorsDiagnosis"
                    label={t("diagnosis.doctor")}
                  />
                  <BTextField name="therapy" label={t("therapy")} />
                  <BTextField name="referral" label={t("referral")} />
                  <BTextField name="anamnesis" label={t("anamnesis")} />
                  <BTextField name="control" label={t("control")} />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleToggleModal}
                    color="primary"
                    variant="contained"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    onClick={submitForm}
                    color="primary"
                    variant="contained"
                  >
                    {t("save")}
                  </Button>
                </DialogActions>
              </>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CreateDiagnosisEventModal;
