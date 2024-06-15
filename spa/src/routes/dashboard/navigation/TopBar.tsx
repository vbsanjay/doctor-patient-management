import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { useStyles } from "../dashboard-styles";
import { AuthService } from "../../../auth";
import { useTranslation } from "react-i18next";
import { LANGUAGE, updateLanguage } from "../../../i18/i18";

interface MainNavigationProps {
  isDrawerVisible: boolean;
  setIsDrawerVisible: any;
}

const TopBar: React.FC<MainNavigationProps> = (props: MainNavigationProps) => {
  const { setIsDrawerVisible } = props;
  const { t, i18n } = useTranslation();

  const [menuAnchor, setMenuAnchor] = useState<undefined | HTMLElement>(
    undefined
  );
  const [isAuthenticationMenuOpen, setIsAuthenticationMenuOpen] = useState<
    boolean
  >(false);

  const openAuthenticationMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
    setIsAuthenticationMenuOpen(true);
  };

  const closeAuthenticationMenu = () => setIsAuthenticationMenuOpen(false);

  const logout = () => {
    AuthService.logout();
  };

  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerVisible(true)}
        >
          <MenuRoundedIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" className={classes.pusher}>
          {t("menu")}
        </Typography>

        <Button
          onClick={openAuthenticationMenu}
          color="default"
          className={classes.myProfile}
        >
          {t("my.profile")}
        </Button>

        <Menu
          id="menu-appbar"
          anchorEl={menuAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isAuthenticationMenuOpen}
          onClose={closeAuthenticationMenu}
        >
          <MenuItem onClick={logout}>{t("logout")}</MenuItem>
          <MenuItem onClick={() => updateLanguage(LANGUAGE.EN)}>EN</MenuItem>
          <MenuItem onClick={() => updateLanguage(LANGUAGE.MK)}>MK</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
