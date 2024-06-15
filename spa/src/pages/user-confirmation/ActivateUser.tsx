import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthService } from "../../auth";
import { RoutePaths } from "../../routes/routePaths";
import GridContainer from "../../shared/widgets/container/GridContainer";
import GridContainerItem from "../../shared/widgets/container/GridContainerItem";
import logo from "../../shared/images/logo.png";
import { Box, Typography } from "@material-ui/core";
import HeroContainer from "../../shared/widgets/container/HeroContainer";
import { useTranslation } from "react-i18next";

export const ActivateUser = (): JSX.Element | null => {
  const { token } = useParams<{ token: string }>();
  const { t } = useTranslation();
  const [isUserActivated, setIsUserActivated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    AuthService.activate(token)
      .then(() => setIsUserActivated(true))
      .catch(() => setIsUserActivated(false));
  }, []);

  if (isUserActivated === undefined) {
    return null;
  }

  const renderMessage = (): JSX.Element => {
    if (!isUserActivated) {
      return <>{t("profile.activation.fail")}</>;
    } else {
      return (
        <>
          {t("profile.activation.successful")}{" "}
          <Link to={RoutePaths.LOGIN}>{t("here")}</Link>
        </>
      );
    }
  };

  return (
    <HeroContainer maxWidth={"sm"}>
      <GridContainer>
        <GridContainerItem xs={12} justify={"center"}>
          <img src={logo} alt={"logo"} width={255} height={150} />
        </GridContainerItem>
        <GridContainerItem xs={12} justify="center">
          <Box mt={6}>
            <Typography>{renderMessage()}</Typography>
          </Box>
        </GridContainerItem>
      </GridContainer>
    </HeroContainer>
  );
};
