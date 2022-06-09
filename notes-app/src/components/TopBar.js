import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Stack } from '@mui/material';


function TopBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#6200EE" }}>
        <Toolbar disableGutters={true}>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            {props.leftSide}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} alignItems={"center"}>
            {props.rightSide}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar;