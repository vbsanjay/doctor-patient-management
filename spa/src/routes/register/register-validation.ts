import { useTranslation } from "react-i18next";

const Yup = require("yup");

export const useRegisterSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    username: Yup.string().required(t("username.required")),
    email: Yup.string()
      .email(t("email.wrong.format"))
      .required(t("email.required")),
    password: Yup.string()
      .required(t("password.required"))
      .min(6, t("password.min")),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      t("password.match")
    ),
  });
};
