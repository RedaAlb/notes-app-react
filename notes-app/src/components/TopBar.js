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

            <LeftSide> {props.children[0]} </LeftSide>

            <Box sx={{ flexGrow: 1 }} />

            <RightSide> {props.children[1]} </RightSide>
          </Toolbar>
        </AppBar>
      </Box>

      <DrawerComp drawerState={drawerState} setDrawerState={setDrawerState} />
    </>
  )
}


function LeftSide(props) {
  return (
    <>
      {props.children}
    </>
  )
}


function RightSide(props) {
  return (
    <Stack direction="row" spacing={1} alignItems={"center"}>
      {props.children}
    </Stack>
  )
}


TopBar.LeftSide = LeftSide;
TopBar.RightSide = RightSide;

export default TopBar;