import * as React from "react";
import { Grid, GridProps } from "@material-ui/core";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} {...props}>
    {props.children}
  </Grid>
);

export default GridItem;
