import { useTranslation } from "react-i18next";

const Yup = require("yup");

export const useLoginSchema = (): unknown => {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .email(t("email.wrong.format"))
      .required(t("email.required")),
    password: Yup.string()
      .required(t("password.required"))
      .min(6, t("password.min")),
  });
};
