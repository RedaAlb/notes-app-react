import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Stack } from '@mui/material';

import SearchBox from './SearchBox';


function TopBar(props) {
  const [moreOptionsAnchor, setMoreOptionsAnchor] = useState(null);
  const isMoreOptionsOpen = Boolean(moreOptionsAnchor);

  const handleMobileMenuClose = () => {
    setMoreOptionsAnchor(null);
  }

  const handleMobileMenuOpen = (event) => {
    setMoreOptionsAnchor(event.currentTarget);
  }

  const onSaveClick = () => {
    console.log("Save");
  }

  const onLoadClick = () => {
    console.log("Load");
  }


  const moreOptionsMenu = (
    <Menu
      anchorEl={moreOptionsAnchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right', }}
      open={isMoreOptionsOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{ style: { width: 250, }, }}
    >
      <MenuItem onClick={onSaveClick} dense={true}>
        <IconButton size="large" color="inherit"><SaveIcon /></IconButton>
        <p>Save</p>
      </MenuItem>

      <MenuItem onClick={onLoadClick} dense={true}>
        <IconButton size="large" color="inherit"><DownloadIcon /></IconButton>
        <p>Load</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#6200EE" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Notes
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <SearchBox />

          <Stack direction="row" spacing={1}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit"><MoreIcon /></IconButton>
            {moreOptionsMenu}
          </Stack>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar;