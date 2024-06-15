import * as React from 'react';
import {Grid, GridProps} from '@material-ui/core';
import { gridSpacing } from './GridContainer';

const GridContainerItem = (props: GridProps) => {
  return (
    <Grid container item spacing={gridSpacing} {...props}>
      {props.children}
    </Grid>
  );
};

export default GridContainerItem;
