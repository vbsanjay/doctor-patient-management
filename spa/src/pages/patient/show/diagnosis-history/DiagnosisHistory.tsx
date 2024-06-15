import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@material-ui/core";
import { Timeline } from "react-event-timeline";
import DiagnosisEvent from "./diagnosis-event/DiagnosisEvent";
import { patientApi } from "../../../../api/patientApi";
import CreateDiagnosisEventModal from "./diagnosis-event/CreateDiagnosisEventModal";
import { DiagnosisCodeContextProvider } from "../../../../contexts/DiagnosisCodeProvider";
import { DiagnosisHistoryDto, PatientDto } from "../../../../endpoints";
import { useTranslation } from "react-i18next";

interface DiagnosisHistoryProps {
  patient: PatientDto;
}

const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({
  patient,
}: DiagnosisHistoryProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const [diagnosisHistory, setDiagnosisHistory] = React.useState<Array<
    DiagnosisHistoryDto
  > | null>(null);

  useEffect(() => {
    const run = async () => {
      const foundDiagnosisHistory:
        | DiagnosisHistoryDto[]
        | null = await patientApi.getPatientDiagnosisHistory(patient.id);
      setDiagnosisHistory(foundDiagnosisHistory);
    };
    run();
  }, [patient.id]);

  const handleToggleModal = () => setOpen(!open);

  const updatePatientDiagnosisHistory = async () => {
    const foundDiagnosisHistory = await patientApi.getPatientDiagnosisHistory(
      patient.id
    );
    setDiagnosisHistory(foundDiagnosisHistory);
  };

  return (
    <>
      <DiagnosisCodeContextProvider>
        <CreateDiagnosisEventModal
          updatePatientDiagnosisHistory={updatePatientDiagnosisHistory}
          handleToggleModal={handleToggleModal}
          open={open}
          patient={patient}
        />

        <Card>
          <CardHeader
            title={t("diagnosis.history")}
            titleTypographyProps={{
              variant: "subtitle1",
              color: "textSecondary",
            }}
            action={
              <Button
                color="primary"
                variant="contained"
                onClick={handleToggleModal}
              >
                {t("add")}
              </Button>
            }
          />
          <CardContent>
            {diagnosisHistory && (
              <Timeline>
                {diagnosisHistory.map((diagnosisEvent) => (
                  <DiagnosisEvent
                    key={diagnosisEvent.id}
                    diagnosisEvent={diagnosisEvent}
                    updatePatientDiagnosisHistory={
                      updatePatientDiagnosisHistory
                    }
                  />
                ))}
              </Timeline>
            )}
          </CardContent>
        </Card>
      </DiagnosisCodeContextProvider>
    </>
  );
};

export default DiagnosisHistory;
