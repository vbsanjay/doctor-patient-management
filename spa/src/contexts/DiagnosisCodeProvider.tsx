import React, { useEffect, useState } from "react";
import {
  DiagnosisCodeApiResponse,
  diagnosisCodesApi,
} from "../api/diagnosisCodesApi";

export const DiagnosisCodeContext = React.createContext<
  DiagnosisCodeApiResponse[]
>({} as DiagnosisCodeApiResponse[]);

export const DiagnosisCodeContextProvider = ({ children }) => {
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<DiagnosisCodeApiResponse>
  >({} as DiagnosisCodeApiResponse[]);

  useEffect(() => {
    diagnosisCodesApi
      .getDiagnosisCodes()
      .then((diagnosisCodes) => setDiagnosisCodes(diagnosisCodes));
  }, []);

  return (
    <>
      {diagnosisCodes && (
        <DiagnosisCodeContext.Provider value={diagnosisCodes}>
          {children}
        </DiagnosisCodeContext.Provider>
      )}
    </>
  );
};
