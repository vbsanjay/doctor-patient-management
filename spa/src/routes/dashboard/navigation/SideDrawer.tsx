import { Drawer as MDrawer, Hidden } from "@material-ui/core";
import React from "react";
import { useStyles } from "../dashboard-styles";
import Drawer from "../drawer/Drawer";

type SideNavigationProps = {
  isDrawerVisible: boolean;
  setIsDrawerVisible: any;
};

const SideDrawer: React.FC<SideNavigationProps> = (props) => {
  const { isDrawerVisible, setIsDrawerVisible } = props;
  const classes = useStyles();

  const handleDrawerToggle = () => setIsDrawerVisible(!isDrawerVisible);

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <MDrawer
          variant="temporary"
          open={isDrawerVisible}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Drawer handleDrawerToggle={handleDrawerToggle} />
        </MDrawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <MDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Drawer />
        </MDrawer>
      </Hidden>
    </nav>
  );
};

export default SideDrawer;
