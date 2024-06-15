import * as React from 'react';
import {Grid, GridProps} from '@material-ui/core';

export const gridSpacing = 3;

const GridContainer = (props: GridProps) => {
  return (
    <Grid container spacing={gridSpacing} {...props}>
      {props.children}
    </Grid>
  );
};

export default GridContainer;
