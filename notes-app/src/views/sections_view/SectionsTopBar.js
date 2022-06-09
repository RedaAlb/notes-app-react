import React, { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';

import SearchBox from '../../components/SearchBox';
import SectionsViewMenu from './SectionsViewMenu';


function SectionsTopBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#6200EE" }}>
        <Toolbar disableGutters={true}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <IconButton size="large" onClick={props.toggleDrawer("left", true)}>
              <MenuIcon sx={{ color: "#ffffff" }} />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              Sections
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} alignItems={"center"}>
            <SearchBox />
            <SectionsViewMenu
              showDragHandle={props.showDragHandle}
              setShowDragHandle={props.setShowDragHandle}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default memo(SectionsTopBar);