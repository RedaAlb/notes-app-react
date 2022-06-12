import React, { memo } from 'react';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import SearchBox from '../../components/SearchBox';
import TopBar from '../../components/TopBar';

import SectionsViewMenu from './SectionsViewMenu';
import { SECTIONS_TOPBAR_BG } from '../../utils/constants';


function SectionsTopBar(props) {

  const leftSide = (
    <>
      <IconButton size="large" onClick={props.toggleDrawer("left", true)}>
        <MenuIcon sx={{ color: "#ffffff" }} />
      </IconButton>

      <Typography variant="h6" noWrap component="div">
        Sections
      </Typography>
    </>
  )


  const rightSide = (
    <>
      <SearchBox />
      <SectionsViewMenu
        showDragHandle={props.showDragHandle}
        setShowDragHandle={props.setShowDragHandle}
      />
    </>
  )


  return (
    <TopBar
      bgColour={SECTIONS_TOPBAR_BG}
      leftSide={leftSide}
      rightSide={rightSide}
    />
  )
}

export default memo(SectionsTopBar);