import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';

import { SETTING_ITEM_HEIGHT } from '../../utils/constants';


function SettingsItem(props) {
  const [toggle, setToggle] = useState(false);


  const onItemClick = () => {
    const newToggle = !toggle;

    setToggle(newToggle);
    props.onClick(newToggle);
  }


  return (
    <ListItem
      button
      onClick={onItemClick}
      style={{ height: SETTING_ITEM_HEIGHT, borderBottom: "1px solid #b8b8b8" }}
    >
      <ListItemIcon> {props.icon} </ListItemIcon>
      <ListItemText primary={props.text} />
      {props.switch ? (
        <Switch checked={toggle} />
      ) : null}
    </ListItem>
  )
}

export default SettingsItem;