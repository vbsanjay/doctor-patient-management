import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { patientApi } from "../../../api/patientApi";
import GridContainer from "../../../shared/widgets/container/GridContainer";
import GridItem from "../../../shared/widgets/container/GridItem";
import PrimaryPatientInformation from "./PrimaryPatientInformation";
import SecondaryPatientInformation from "./secondary-patient-information/SecondaryPatientInformation";
import DiagnosisHistory from "./diagnosis-history/DiagnosisHistory";
import PatientImages from "./patient-images/PatientImages";
import LoaderOverlayContextProvider from "../../../contexts/LoaderOverlayProvider";
import { PatientDto } from "../../../endpoints";

const PatientShow = (): JSX.Element => {
  const params = useParams<{ id }>();
  const [patient, setPatient] = React.useState<PatientDto | undefined>(
    undefined
  );

  useEffect(() => {
    const getPatientData = async () => {
      const patientId = params.id;
      if (patientId === null) {
        return;
      }
      const foundPatient = await patientApi.getPatient(Number(patientId));
      setPatient(foundPatient);
    };
    getPatientData();
  }, [params.id]);

  const updatePatient = async () => {
    const foundPatient = await patientApi.getPatient(Number(patient?.id));
    setPatient(foundPatient);
  };

  return (
    <>
      <GridContainer>
        <GridItem md={6}>
          {patient && (
            <PrimaryPatientInformation
              patient={patient}
              updatePatient={updatePatient}
            />
          )}
        </GridItem>
        <GridItem md={6}>
          {patient && <SecondaryPatientInformation patient={patient} />}
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem>{patient && <DiagnosisHistory patient={patient} />}</GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem>
          {patient && (
            <LoaderOverlayContextProvider>
              <PatientImages patientId={patient.id} />
            </LoaderOverlayContextProvider>
          )}
        </GridItem>
      </GridContainer>
    </>
  );
};

export default PatientShow;
