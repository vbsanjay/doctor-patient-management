import { createStyles, makeStyles, Theme } from "@material-ui/core";

const drawerWidth = 240;
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    pusher: {
      flexGrow: 1,
    },
    myProfile: {
      color: "white",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: "47px !important",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
      },
    },
  })
);
