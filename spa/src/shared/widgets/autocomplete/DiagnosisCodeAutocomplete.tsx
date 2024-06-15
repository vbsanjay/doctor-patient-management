import React, { useContext, useState } from "react";
import { DiagnosisCodeApiResponse } from "../../../api/diagnosisCodesApi";
import BTextField from "../formik/BTextField";
import { Autocomplete } from "@material-ui/lab";
import { DiagnosisCodeContext } from "../../../contexts/DiagnosisCodeProvider";
import { useField } from "formik";
import { nameOf } from "../../../nameOf";
import { DiagnosisHistoryDto } from "../../../endpoints";
import { useTranslation } from "react-i18next";

export const formikDiagnosisCodeInputName = nameOf<DiagnosisHistoryDto>(
  "diagnosisCode"
);

const DiagnosisCodeAutocomplete: React.FC = () => {
  const diagnosisCodes = useContext(DiagnosisCodeContext);
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(formikDiagnosisCodeInputName);

  const initialSelectedDiagnosisCode:
    | DiagnosisCodeApiResponse
    | undefined = diagnosisCodes.find((value) => {
    return value?.id === meta.value?.id;
  });

  const [selectedDiagnosisCode, setSelectedDiagnosisCode] = useState<
    DiagnosisCodeApiResponse | undefined
  >(initialSelectedDiagnosisCode);

  const [selectedInputDiagnosisCode, setSelectedInputDiagnosisCode] = useState<
    string | undefined
  >(initialSelectedDiagnosisCode?.fullDiagnosis);

  return (
    <Autocomplete
      value={selectedDiagnosisCode}
      inputValue={selectedInputDiagnosisCode}
      options={diagnosisCodes}
      getOptionLabel={(diagnosisCode: DiagnosisCodeApiResponse) => {
        return diagnosisCode.fullDiagnosis;
      }}
      onInputChange={(event, value) => {
        setSelectedInputDiagnosisCode(value);
      }}
      onChange={(event, value) => {
        const diagnosisCode = value as DiagnosisCodeApiResponse;
        setSelectedDiagnosisCode(diagnosisCode);
        helpers.setValue(diagnosisCode ?? { id: undefined });
      }}
      getOptionSelected={(
        diagnosisCode: DiagnosisCodeApiResponse,
        value: DiagnosisCodeApiResponse
      ) => {
        return Number(diagnosisCode.id) === Number(value.id);
      }}
      renderInput={(params) => (
        <BTextField
          {...params}
          name={formikDiagnosisCodeInputName + ".id"}
          label={t("diagnosis.mkb")}
          variant="outlined"
        />
      )}
    />
  );
};

export default DiagnosisCodeAutocomplete;
