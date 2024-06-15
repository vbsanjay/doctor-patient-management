import React from "react";
import DiagnosisCodeAutocomplete from "../../../../../../shared/widgets/autocomplete/DiagnosisCodeAutocomplete";
import { Typography } from "@material-ui/core";
import BTextField from "../../../../../../shared/widgets/formik/BTextField";
import { nameOf } from "../../../../../../nameOf";
import { DiagnosisHistoryDto } from "../../../../../../endpoints";
import { useTranslation } from "react-i18next";

interface DiagnosisEventContentProps {
  isEditModeEnabled: boolean;
  diagnosisEvent: DiagnosisHistoryDto;
}

const DiagnosisEventContent: React.FC<DiagnosisEventContentProps> = ({
  isEditModeEnabled,
  diagnosisEvent,
}: DiagnosisEventContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      {isEditModeEnabled ? (
        <DiagnosisCodeAutocomplete />
      ) : (
        <>
          {/*<Typography variant="body1">МКБ100 Дијагноза</Typography>*/}
          {/*<Typography variant="body2">*/}
          {/*  {diagnosisEvent.diagnosisCode.fullDiagnosis}*/}
          {/*</Typography>*/}
        </>
      )}

      {isEditModeEnabled ? (
        <BTextField
          multiline
          name={nameOf<DiagnosisHistoryDto>("doctorsDiagnosis")}
          placeholder={t("diagnosis.doctor")}
          value={diagnosisEvent.doctorsDiagnosis}
        />
      ) : (
        <>
          {diagnosisEvent.doctorsDiagnosis && (
            <>
              <br />
              <Typography variant="body1">{t("diagnosis.doctor")}</Typography>
              <Typography variant="body2">
                {diagnosisEvent.doctorsDiagnosis}
              </Typography>
            </>
          )}
        </>
      )}

      {isEditModeEnabled ? (
        <BTextField
          name="anamnesis"
          placeholder={t("anamnesis")}
          value={diagnosisEvent.anamnesis}
        />
      ) : (
        <>
          {diagnosisEvent.anamnesis && (
            <>
              <br />
              <Typography variant="body1">{t("anamnesis")}</Typography>
              <Typography variant="body2">
                {diagnosisEvent.anamnesis}
              </Typography>
            </>
          )}
        </>
      )}

      {isEditModeEnabled ? (
        <BTextField
          name="therapy"
          placeholder={t("therapy")}
          value={diagnosisEvent.therapy}
        />
      ) : (
        <>
          {diagnosisEvent.therapy && (
            <>
              <br />
              <Typography variant="body1">{t("therapy")}</Typography>
              <Typography variant="body2">{diagnosisEvent.therapy}</Typography>
            </>
          )}
        </>
      )}

      {isEditModeEnabled ? (
        <BTextField
          name="referral"
          placeholder={t("referral")}
          value={diagnosisEvent.referral}
        />
      ) : (
        <>
          {diagnosisEvent.referral && (
            <>
              <br />
              <Typography variant="body1">{t("referral")}</Typography>
              <Typography variant="body2">{diagnosisEvent.referral}</Typography>
            </>
          )}
        </>
      )}

      {isEditModeEnabled ? (
        <BTextField
          name="control"
          placeholder={t("control")}
          value={diagnosisEvent?.control}
        />
      ) : (
        <>
          {diagnosisEvent.control && (
            <>
              <br />
              <Typography variant="body1">{t("control")}</Typography>
              <Typography variant="body2">{diagnosisEvent?.control}</Typography>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DiagnosisEventContent;
