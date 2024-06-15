export const RoutePaths = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER_CONFIRMATION_INDEX: "/user-confirmation",
  USER_CONFIRMATION_PROMPT: "/user-confirmation/notify",
  USER_CONFIRMATION_ACTIVATE: "/user-confirmation/activate/:token",
  USER_CONFIRMATION_RESEND: "/user-confirmation/resend",
  PATIENT_INDEX: "/patient",
  PATIENT_CREATE_PAGE: "/patient/create",
  PATIENT_COUNT: "/patient/count",
  PATIENT_SHOW: (id: number | null): string => {
    if (id === undefined) {
      throw new Error("Patient ID is missing from URL. Route: PATIENT_SHOW");
    }
    return `/patient/${id}`;
  },
  DIAGNOSIS_CODE_INDEX: "/diagnosis/code",
};

export const ApiRoutes = {
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  RESEND_CONFIRMATION: "/api/confirm-profile/resend",
  IS_LOGGED: "/api/logged",
  REGISTER: "/api/register",
  ACTIVATE: (token: string): string => {
    if (token === undefined) {
      throw new Error("Token is missing from URL. Route: ACTIVATE");
    }
    return `/api/confirm-profile/${token}`;
  },
  PATIENT_INDEX: "/api/patient",
  PATIENT_GET: (patientId: number): string => {
    if (patientId === undefined) {
      throw new Error("Patient ID is missing from URL. Route: PATIENT_GET");
    }
    return `/api/patient/${String(patientId)}`;
  },
  PATIENT_CREATE: "/api/patient",
  PATIENT_UPDATE: (patientId: number): string => {
    if (patientId === undefined) {
      throw new Error("Patient ID is missing from URL. Route: PATIENT_UPDATE");
    }
    return `/api/patient/`;
  },
  PATIENT_DELETE: (patientId: number): string => {
    if (patientId === undefined) {
      throw new Error("Patient ID is missing from URL. Route: PATIENT_DELETE");
    }
    return `/api/patient/${patientId}`;
  },
  ALL_DIAGNOSIS_HISTORY_FOR_PATIENT: (id: number): string => {
    if (id === undefined || id === null) {
      throw new Error(
        "Patient ID is missing from URL. Route: ALL_DIAGNOSIS_HISTORY_FOR_PATIENT"
      );
    }
    return `/api/diagnosis/history?patientId=${id}`;
  },
  DIAGNOSIS_HISTORY_UPDATE: (diagnosisId: number): string => {
    if (diagnosisId === undefined || diagnosisId === null) {
      throw new Error("Diagnosis history ID is missing from route");
    }
    return `/api/diagnosis/history`;
  },
  DIAGNOSIS_HISTORY_CREATE: "/api/diagnosis/history",
  DIAGNOSIS_HISTORY_DELETE: "/api/diagnosis/history/",
  DIAGNOSIS_CODE_INDEX: "/api/diagnosis/code",
  IMAGE_CREATE: "/api/image",
  IMAGE_INDEX: (id: number): string => {
    if (id === undefined || id === null) {
      throw new Error("Patient ID is missing from URL. Route: IMAGE_INDEX");
    }
    return `/api/image?patientId=${id}`;
  },
  IMAGE_DELETE: `/api/image`,
};
