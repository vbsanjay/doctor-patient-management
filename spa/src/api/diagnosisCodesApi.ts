import { ApiRoutes } from "../routes/routePaths";

export interface DiagnosisCodeApiResponse {
  code: string; // "L00"
  disease: string; // "Синдром на стафилококна кожна инфекција"
  fullDiagnosis: string; // "L00 - Синдром на стафилококна кожна инфекција"
  id: number;
}

const getDiagnosisCodes = async (): Promise<
  Array<DiagnosisCodeApiResponse>
> => {
  const response = await fetch(ApiRoutes.DIAGNOSIS_CODE_INDEX, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) {
    const error = new Error("Failed fetching diagnosis codes");
    return Promise.reject(error);
  }

  return Promise.resolve(response.json());
};

export const diagnosisCodesApi = {
  getDiagnosisCodes,
};
