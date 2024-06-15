import * as Yup from "yup";
import { nameOf } from "../../../nameOf";
import { PatientDto } from "../../../endpoints";
import { useTranslation } from "react-i18next";

export const usePatientValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    [nameOf<PatientDto>("firstName")]: Yup.string().required(
      t("firstname.required")
    ),
    [nameOf<PatientDto>("lastName")]: Yup.string().required(
      t("lastname.required")
    ),
    phone: Yup.number().required(t("telephone.number.required")),
    email: Yup.string().email(t("email.wrong.format")).nullable(),
    note: Yup.string().nullable(),
  });
};
