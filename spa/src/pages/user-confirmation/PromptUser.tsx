import React from "react";
import HeroContainer from "../../shared/widgets/container/HeroContainer";
import GridContainer from "../../shared/widgets/container/GridContainer";
import GridContainerItem from "../../shared/widgets/container/GridContainerItem";
import logo from "../../shared/images/logo.png";
import { Typography, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const PromptUser = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <HeroContainer maxWidth={"sm"}>
      <GridContainer>
        <GridContainerItem xs={12} justify={"center"}>
          <img src={logo} alt="logo" width={255} height={150} />
        </GridContainerItem>
        <GridContainerItem xs={12} justify="center">
          <Box mt={6}>
            <Typography>{t("profile.activation.promp")}</Typography>
          </Box>
        </GridContainerItem>
      </GridContainer>
    </HeroContainer>
  );
};
