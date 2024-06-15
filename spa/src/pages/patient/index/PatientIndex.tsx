import React, { FC, useEffect, useState } from "react";
import { patientApi } from "../../../api/patientApi";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../routes/routePaths";
import { Typography } from "@material-ui/core";
import { PatientDto } from "../../../endpoints";
import { useTranslation } from "react-i18next";

const PatientIndex: FC = () => {
  const [patients, setPatients] = useState<PatientDto[] | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    const run = async () => {
      setPatients(await patientApi.getAllPatients());
    };
    run();
  }, []);

  return (
    <div>
      {patients && (
        <MaterialTable
          columns={[
            {
              title: t("fullname"),
              field: "fullname",
              render: function PatientNameColumn(
                patient: PatientDto
              ): JSX.Element {
                return (
                  <Typography>
                    <Link to={RoutePaths.PATIENT_SHOW(patient.id)}>
                      {patient.fullName}
                    </Link>
                  </Typography>
                );
              },
            },
            { title: t("telephone"), field: "phone" },
            { title: t("email"), field: "email" },
          ]}
          data={patients}
          title={t("patients")}
          options={{
            pageSize: 20,
          }}
        />
      )}
    </div>
  );
};

export default PatientIndex;
