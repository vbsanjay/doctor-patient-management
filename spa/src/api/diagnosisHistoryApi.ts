import { ApiRoutes } from "../routes/routePaths";
import { DiagnosisHistoryDto } from "../endpoints";

const createDiagnosisHistory = async (
  diagnosisHistoryRequest: DiagnosisHistoryDto
): Promise<void> => {
  const response = await fetch(ApiRoutes.DIAGNOSIS_HISTORY_CREATE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(diagnosisHistoryRequest),
  });

  if (!response.ok) {
    const error = new Error(
      "Failed creating diagnosis event with payload: " +
        JSON.stringify(diagnosisHistoryRequest)
    );
    return Promise.reject(error);
  }

  return Promise.resolve();
};

const updateDiagnosisHistory = async (
  diagnosisHistoryPayload: DiagnosisHistoryDto
): Promise<any> => {
  if (diagnosisHistoryPayload.id === undefined) {
    return Promise.reject("Missing id");
  }
  const response = await fetch(
    ApiRoutes.DIAGNOSIS_HISTORY_UPDATE(diagnosisHistoryPayload.id),
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(diagnosisHistoryPayload),
    }
  );

  if (!response.ok) {
    const error = new Error("Failed fetching diagnosis codes");
    return Promise.reject(error);
  }

  return Promise.resolve();
};

const deleteDiagnosisHistory = async (
  diagnosis: DiagnosisHistoryDto
): Promise<void> => {
  const response = await fetch(ApiRoutes.DIAGNOSIS_HISTORY_DELETE, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify(diagnosis),
  });

  if (!response.ok) {
    const error = new Error("Failed removing diagnosis history");
    return Promise.reject(error);
  }

  return Promise.resolve();
};

export const diagnosisHistoryApi = {
  createDiagnosisHistory,
  updateDiagnosisHistory,
  deleteDiagnosisHistory,
};
