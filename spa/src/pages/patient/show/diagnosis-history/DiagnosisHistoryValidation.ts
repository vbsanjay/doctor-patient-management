import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useDiagnosisHistoryValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    diagnosisCode: Yup.object()
      .required()
      .shape({
        id: Yup.number()
          .required(t("diagnosis.mkb.required"))
          .typeError(t("diagnosis.mkb.preselection")),
      }),
    doctors_diagnosis: Yup.string().nullable(),
    anamnesis: Yup.string().nullable(),
    therapy: Yup.string().nullable(),
    referral: Yup.string().nullable(),
    control: Yup.string().nullable(),
  });
};
