import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from "@material-ui/core";
import GridContainer from "../../shared/widgets/container/GridContainer";
import GridItem from "../../shared/widgets/container/GridItem";
import EmojiPeopleTwoToneIcon from "@material-ui/icons/EmojiPeopleTwoTone";
import { patientApi } from "../../api/patientApi";

const Home = () => {
  const [registeredPatientCount, setRegisteredPatientCount] = useState<number>(
    0
  );

  useEffect(() => {
    patientApi
      .getRegisteredPatientCount()
      .then((count) => setRegisteredPatientCount(count));
  }, []);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={9} md={5} lg={3}>
          <Card>
            <CardHeader
              title="Број на Пациенти"
              subheader="вкупно регистрирани"
              avatar={<EmojiPeopleTwoToneIcon fontSize="large" />}
            />
            <CardContent>
              <Typography variant="h3">
                <Box fontWeight="fontWeightBold">{registeredPatientCount}</Box>
              </Typography>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default Home;
