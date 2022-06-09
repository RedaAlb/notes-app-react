import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import MoreIcon from '@mui/icons-material/MoreVert';

import OptionsMenu from '../../components/OptionsMenu';


function NotesViewMenu(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);


  return (
    <OptionsMenu
      id="notes-topbar-options"
      btnContent={<MoreIcon style={{ color: "white" }} />}
      btnSize="large"
      minWidth={250}
      menuAnchor={menuAnchor}
      setMenuAnchor={setMenuAnchor}
    >
      <MenuItem dense={true}>
        <IconButton size="large" color="inherit"><SaveIcon /></IconButton>
        <p>Placeholder</p>
      </MenuItem>
    </OptionsMenu>
  )
}

export default NotesViewMenu;