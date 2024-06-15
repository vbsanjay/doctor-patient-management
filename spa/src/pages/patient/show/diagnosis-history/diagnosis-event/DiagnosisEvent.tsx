import React, { useRef, useState } from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import { TimelineEvent } from "react-event-timeline";
import { Formik } from "formik";
import { diagnosisHistoryApi } from "../../../../../api/diagnosisHistoryApi";
import { useSnackbar } from "notistack";
import { useReactToPrint } from "react-to-print";
import { useTheme } from "@material-ui/core/styles";
import DiagnosisEventActionButtons from "./DiagnosisEventActionButtons";
import DiagnosisEventContentPrint from "./diagnosis-content/DiagnosisEventContentPrint";
import DiagnosisEventContent from "./diagnosis-content/DiagnosisEventContent";
import { useDiagnosisHistoryValidationSchema } from "../DiagnosisHistoryValidation";
import { DiagnosisHistoryDto } from "../../../../../endpoints";
import { useTranslation } from "react-i18next";

interface DiagnosisEventProps {
  diagnosisEvent: DiagnosisHistoryDto;
  updatePatientDiagnosisHistory: () => void;
}

const DiagnosisEvent: React.FC<DiagnosisEventProps> = ({
  diagnosisEvent,
  updatePatientDiagnosisHistory,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isDeviceMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const { t } = useTranslation();

  const componentForPrintingRef = useRef(null);

  const handleDiagnosisEventSubmit = async (submitForm) => {
    submitForm();
    setIsEditModeEnabled(!isEditModeEnabled);
  };

  const handlePrint = useReactToPrint({
    content: () => componentForPrintingRef.current,
  });

  const handleDelete = async (
    diagnosis: DiagnosisHistoryDto
  ): Promise<void> => {
    await diagnosisHistoryApi.deleteDiagnosisHistory(diagnosis);
    enqueueSnackbar(t("diagnosis.removed"), { variant: "success" });
    updatePatientDiagnosisHistory();
  };

  const handleUpdate = () => {
    setIsEditModeEnabled(!isEditModeEnabled);
  };

  const handleSubmit = (values: DiagnosisHistoryDto) => {
    diagnosisHistoryApi
      .updateDiagnosisHistory(values)
      .then(() => {
        updatePatientDiagnosisHistory();
        setIsEditModeEnabled(false);
        enqueueSnackbar(t("diagnosis.saved"), { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar(t("diagnosis.failed"), {
          variant: "error",
        });
      });
  };

  return (
    <>
      <Formik
        validationSchema={useDiagnosisHistoryValidationSchema()}
        initialValues={diagnosisEvent}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => {
          return (
            <TimelineEvent
              key={diagnosisEvent.id}
              buttons={
                <DiagnosisEventActionButtons
                  isEditModeEnabled={isEditModeEnabled}
                  handleSubmit={() => handleDiagnosisEventSubmit(submitForm)}
                  handlePrint={handlePrint}
                  handleDelete={() => handleDelete(diagnosisEvent)}
                  handleUpdate={handleUpdate}
                />
              }
              title=""
              contentStyle={{ boxShadow: "none", padding: "15px" }}
              createdAt={
                isDeviceMdUp ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {diagnosisEvent?.updatedAt}
                  </Typography>
                ) : null
              }
              icon={null}
              iconColor={theme.palette.primary.main}
            >
              <DiagnosisEventContent
                isEditModeEnabled={isEditModeEnabled}
                diagnosisEvent={diagnosisEvent}
              />
              {componentForPrintingRef && (
                <DiagnosisEventContentPrint
                  isEditModeEnabled={isEditModeEnabled}
                  diagnosisEvent={diagnosisEvent}
                  refPrint={componentForPrintingRef}
                />
              )}
            </TimelineEvent>
          );
        }}
      </Formik>
    </>
  );
};

export default DiagnosisEvent;
