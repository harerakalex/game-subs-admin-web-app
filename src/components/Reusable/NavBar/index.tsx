import React, { FC, useState, MouseEvent } from 'react';
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { DashboardLayoutStyles } from './styles';
import { Routes } from '../../../utils';
import { RootState } from '../../../redux';

const Navbar: FC = () => {
  const classes = DashboardLayoutStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useSelector((state: RootState) => {
    const { user } = state.login;

    return { user };
  });

  const handleOpenDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    window.location.href = Routes.Home;
  };

  return (
    <>
      {user?.id && (
        <div className={classes.navBar}>
          <Typography component="h1" variant="h6" className={classes.button} noWrap>
            Diver Adz Admin Panel
          </Typography>
          <div className={classes.userInfoWrapper}>
            <Box mr={2} component="div">
              <Avatar alt={user.username || 'Profile Picture'} src="/src/assets/avatar.jpg" />
            </Box>
            <Box component="div">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpenDropdown}
                className={classes.button}
              >
                {user.username}
              </Button>
            </Box>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
