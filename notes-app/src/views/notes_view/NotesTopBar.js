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
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';

import SearchBox from '../../components/SearchBox';

function NotesTopBar(props) {
  const [moreOptionsAnchor, setMoreOptionsAnchor] = useState(null);
  const isMoreOptionsOpen = Boolean(moreOptionsAnchor);


  const handleMobileMenuClose = () => {
    setMoreOptionsAnchor(null);
  }


  const handleMobileMenuOpen = (event) => {
    setMoreOptionsAnchor(event.currentTarget);
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
      <MenuItem dense={true}>
        <IconButton size="large" color="inherit"><SaveIcon /></IconButton>
        <p>Placeholder 1</p>
      </MenuItem>

      <MenuItem dense={true}>
        <IconButton size="large" color="inherit"><DownloadIcon /></IconButton>
        <p>Placeholder 2</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#6200EE" }}>
        <Toolbar disableGutters={true}>

          <Stack direction="row" spacing={1}>
            <IconButton size="large" onClick={props.toggleDrawer("left", true)}>
              <MenuIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Stack>

          <Typography variant="h6" noWrap component="div">
            {props.sectionInView.sectionName}
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

export default NotesTopBar;