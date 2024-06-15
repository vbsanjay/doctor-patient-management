import React, { MutableRefObject } from "react";
import DiagnosisEventContent from "./DiagnosisEventContent";
import GridContainer from "../../../../../../shared/widgets/container/GridContainer";
import GridItem from "../../../../../../shared/widgets/container/GridItem";
import LogoImage from "../../../../../../shared/images/logo.png";
import { LogoImage as Logo } from "../../../../../../shared/widgets/images/LogoImage";
import { Typography } from "@material-ui/core";
import { DiagnosisHistoryDto } from "../../../../../../endpoints";
import { useTranslation } from "react-i18next";

interface DiagnosisEventContentPrintProps {
  isEditModeEnabled: boolean;
  diagnosisEvent: DiagnosisHistoryDto;
  refPrint: MutableRefObject<null>;
}

const DiagnosisEventContentPrint: React.FC<DiagnosisEventContentPrintProps> = ({
  isEditModeEnabled,
  diagnosisEvent,
  refPrint,
}: DiagnosisEventContentPrintProps) => {
  const formattedDate = new Intl.DateTimeFormat("mk-MK").format(Date.now());
  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: "none" }}>
        <div
          ref={refPrint}
          style={{ margin: "25px", marginLeft: "35px", marginRight: "35px" }}
        >
          <GridContainer style={{ width: "100%" }}>
            <GridItem xs={12} style={{ marginBottom: "50px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  verticalAlign: "middle",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Logo src={LogoImage} />
              </div>
            </GridItem>
            <GridItem>
              <DiagnosisEventContent
                isEditModeEnabled={isEditModeEnabled}
                diagnosisEvent={diagnosisEvent}
              />
            </GridItem>
            <GridContainer
              style={{
                position: "absolute",
                left: "35px",
                bottom: "25px",
                right: "0",
              }}
            >
              <GridItem xs={4}>
                <Typography>{t("examination.done.by")}</Typography>
                <Typography style={{ marginBottom: "1px" }}>
                  {t("doctor.accolades")} <br /> {t("dermatovenereologist")}
                </Typography>
                <Typography style={{ marginTop: "1px" }}>
                  {t("lidija")}
                </Typography>
              </GridItem>

              <GridItem
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-evenly",
                  paddingRight: "70px",
                }}
              >
                <Typography>{formattedDate}</Typography>
              </GridItem>

              <GridItem xs={4}>
                <Typography>{t("company")}</Typography>
                <Typography>
                  {t("street")} Васил Ѓоргов 20 Б
                  <br />
                  {t("contact")} 070 257 668
                  <br />
                  {t("email")} info@doctors-patient-management.xyz
                </Typography>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
      </div>
    </>
  );
};

export default DiagnosisEventContentPrint;
