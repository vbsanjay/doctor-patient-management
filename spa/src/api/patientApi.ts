import { ApiRoutes, RoutePaths } from "../routes/routePaths";
import { DiagnosisHistoryDto, PatientDto } from "../endpoints";

export interface PatientStoreRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface DiagnosisHistoryApiRequest {
  patient: PatientDto;
  diagnosisCode: {
    id?: number;
    code?: string;
    disease?: string;
    fullDiagnosis?: string;
  };
  doctorsDiagnosis?: string;
  therapy?: string;
  referral?: string;
  anamnesis?: string;
  control?: string;
}

const getRegisteredPatientCount = async (): Promise<number> => {
  try {
    const response = await fetch(RoutePaths.PATIENT_COUNT);
    if (!response.ok) {
      console.error(JSON.stringify(response));
      const error = new Error(
        "Failed fetching patient count: " + JSON.stringify(response)
      );
      return Promise.reject(error);
    }
    return Number(await response.text());
  } catch (e) {
    console.error(JSON.stringify(e));
    const error = new Error(
      "Failed fetching patient count: " + JSON.stringify(e)
    );
    return Promise.reject(error);
  }
};

const getPatientDiagnosisHistory = async (
  patientId: number
): Promise<Array<DiagnosisHistoryDto> | null> => {
  const response = await fetch(
    ApiRoutes.ALL_DIAGNOSIS_HISTORY_FOR_PATIENT(patientId)
  );
  if (!response.ok) {
    return Promise.reject(
      new Error("Failed fetching patient diagnosis history")
    );
  }

  return response.json();
};

const storePatient = async (patientStoreRequest: PatientStoreRequest) => {
  const response = await fetch(ApiRoutes.PATIENT_CREATE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientStoreRequest),
  });
  // TODO: Think of improving.
  if (!response.ok && response.status.toString(10).includes("5")) {
    console.error(response.text());
    throw new Error("Failed creating new patient");
  }

  return response;
};

const updatePatient = async (
  patientUpdateRequest: PatientDto
): Promise<void> => {
  const response = await fetch(
    ApiRoutes.PATIENT_UPDATE(patientUpdateRequest.id),
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientUpdateRequest),
    }
  );
  if (!response.ok) {
    const error = new Error(
      "Failed updating patient with id: " + patientUpdateRequest.id
    );
    return Promise.reject(error);
  }
  return Promise.resolve();
};

const deletePatient = async (patientId: number): Promise<void> => {
  const response = await fetch(ApiRoutes.PATIENT_DELETE(patientId), {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  if (!response.ok) {
    const error = new Error("Failed deleting patient with id: " + patientId);
    return Promise.reject(error);
  }
  return Promise.resolve();
};

const getPatient = async (id: number): Promise<PatientDto> => {
  const response = await fetch(ApiRoutes.PATIENT_GET(id), {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) {
    const error = new Error("Failed fetching patient with id: " + id);
    return Promise.reject(error);
  }

  return Promise.resolve(await response.json());
};

const getAllPatients = async (): Promise<PatientDto[]> => {
  const response = await fetch(ApiRoutes.PATIENT_INDEX, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) {
    const error = new Error("Failed fetching patients");
    return Promise.reject(error);
  }

  return Promise.resolve(await response.json());
};

export const patientApi = {
  getRegisteredPatientCount,
  getPatientDiagnosisHistory,
  storePatient,
  updatePatient,
  deletePatient,
  getPatient,
  getAllPatients,
};
