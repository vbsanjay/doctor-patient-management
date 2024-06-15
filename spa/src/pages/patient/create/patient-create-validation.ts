import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const usePatientCreateValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    firstName: yup.string().required(t("firstname.required")),
    lastName: yup.string().required(t("lastname.required")),
    phone: yup.string().required(t("telephone.number.required")),
    email: yup.string().email(t("email.wrong.format")),
  });
};
