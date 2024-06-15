import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  DiagnosisCodeApiResponse,
  diagnosisCodesApi,
} from "../../../api/diagnosisCodesApi";
import { useTranslation } from "react-i18next";

const DiagnosisCodeIndex = () => {
  const { t } = useTranslation();
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    DiagnosisCodeApiResponse[] | null
  >(null);

  useEffect(() => {
    const run = async () => {
      setDiagnosisCodes(await diagnosisCodesApi.getDiagnosisCodes());
    };
    run();
  }, []);

  return (
    <div>
      {diagnosisCodes && (
        <MaterialTable
          columns={[
            {
              title: t("code"),
              field: "code",
            },
            { title: t("disease"), field: "disease" },
          ]}
          data={diagnosisCodes}
          title={t("disease.code.title")}
          options={{
            pageSize: 20,
          }}
        />
      )}
    </div>
  );
};

export default DiagnosisCodeIndex;
