import React, { FC, ReactElement, useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Routes } from '../../../utils';
import { RootState } from '../../../redux';
import { LoginTypes } from '../../../redux/action-types/login';

interface IMenu {
  id: number;
  title: string;
  icon: ReactElement;
  url: string;
}

enum ActiveMenu {
  Users = 'User'
}

const menus: IMenu[] = [
  { id: 1, title: ActiveMenu.Users, icon: <PersonIcon />, url: Routes.Users }
];

const AsideMenu: FC = (): ReactElement => {
  const [active, setActive] = useState<string>();

  const { activePath } = useSelector((state: RootState) => {
    const { activePath } = state.login;

    return { activePath };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    switch (activePath) {
      case Routes.Users:
        setActive(ActiveMenu.Users);
        break;

      default:
        setActive(undefined);
    }
  }, [activePath]);

  const updateActiveMenu = (menu: string) => {
    setActive(menu);

    dispatch({
      type: LoginTypes.ActivePath,
      payload: {
        data: menu
      }
    });
  };

  return (
    <List>
      {menus.map((menu, index) => (
        <ListItem
          button
          key={index}
          selected={menu.title === active}
          onClick={() => updateActiveMenu(menu.url)}
          component={Link}
          to={menu.url}
        >
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <ListItemText primary={menu.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default AsideMenu;
