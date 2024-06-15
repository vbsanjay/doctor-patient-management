import React from "react";
import { useStyles } from "./dashboard-styles";
import TopBar from "./navigation/TopBar";
import SideDrawer from "./navigation/SideDrawer";

const Navigation = () => {
  const [isDrawerVisible, setIsDrawerVisible] = React.useState<boolean>(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
      />
      <SideDrawer
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
      />
    </div>
  );
};

export default Navigation;
