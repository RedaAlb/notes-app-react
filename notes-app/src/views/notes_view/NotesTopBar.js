import React, { memo } from 'react';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import SearchBox from '../../components/SearchBox';
import TopBar from '../../components/TopBar';

import NotesViewMenu from './NotesViewMenu';
import { NOTES_TOPBAR_BG } from '../../utils/constants';


function NotesTopBar(props) {

  const leftSide = (
    <>
      <IconButton size="large" onClick={props.toggleDrawer("left", true)}>
        <MenuIcon sx={{ color: "#ffffff" }} />
      </IconButton>

      <Typography variant="h6" noWrap component="div">
        {props.sectionInView.sectionName}
      </Typography>
    </>
  )


  const rightSide = (
    <>
      <SearchBox />
      <NotesViewMenu />
    </>
  )


  return (
    <TopBar
      bgColour={NOTES_TOPBAR_BG}
      leftSide={leftSide}
      rightSide={rightSide}
    />
  )
}

export default memo(NotesTopBar);