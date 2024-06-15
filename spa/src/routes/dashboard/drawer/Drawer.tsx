import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import GroupAddTwoToneIcon from "@material-ui/icons/GroupAddTwoTone";
import SortByAlphaTwoToneIcon from "@material-ui/icons/SortByAlphaTwoTone";
import { useStyles } from "../dashboard-styles";
import { RoutePaths } from "../../routePaths";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DrawerProps {
  handleDrawerToggle?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ handleDrawerToggle }: DrawerProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const patientMenuItems = [
    {
      label: t("all.patients"),
      icon: <GroupTwoToneIcon fontSize={"small"} />,
      link: RoutePaths.PATIENT_INDEX,
    },
    {
      label: t("new.patient"),
      icon: <GroupAddTwoToneIcon fontSize={"small"} />,
      link: RoutePaths.PATIENT_CREATE_PAGE,
    },
  ];
  const codesMenuItems = [
    {
      label: t("disease.code.title"),
      icon: <SortByAlphaTwoToneIcon fontSize={"small"} />,
      link: RoutePaths.DIAGNOSIS_CODE_INDEX,
    },
  ];

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {patientMenuItems.map((menuItem, index) => (
          <ListItem
            button
            exact
            component={NavLink}
            to={menuItem.link}
            onClick={handleDrawerToggle ?? undefined}
            activeClassName="Mui-selected"
            key={index}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {codesMenuItems.map((menuItem, index) => (
          <ListItem
            button
            exact
            component={NavLink}
            to={menuItem.link}
            onClick={handleDrawerToggle ?? undefined}
            activeClassName="Mui-selected"
            key={index}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Drawer;
