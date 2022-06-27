import React from 'react';
import { Typography } from '@mui/material';

import TopBar from '../../components/TopBar';
import { SETTINGS_TOPBAR_BG } from '../../utils/constants';


function SettingsTopBar(props) {
  return (
    <TopBar bgColour={SETTINGS_TOPBAR_BG}>
      <TopBar.LeftSide>
        <Typography variant="h6" noWrap component="div">
          Settings
        </Typography>
      </TopBar.LeftSide>

      <TopBar.RightSide>
      </TopBar.RightSide>
    </TopBar>
  )
}

export default SettingsTopBar;