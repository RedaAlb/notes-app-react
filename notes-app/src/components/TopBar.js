import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Stack } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import DrawerComp from './DrawerComp';


function TopBar(props) {
  const [drawerState, setDrawerState] = useState(false);


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: props.bgColour }}>
          <Toolbar disableGutters={true}>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <IconButton size="large" onClick={() => setDrawerState(true)}>
                <MenuIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </Stack>

            {props.leftSide}

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={1} alignItems={"center"}>
              {props.rightSide}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      <DrawerComp drawerState={drawerState} setDrawerState={setDrawerState} />
    </>
  )
}

export default TopBar;