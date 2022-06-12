import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import SearchBox from '../../components/SearchBox';
import TopBar from '../../components/TopBar';

import { NOTES_TOPBAR_BG } from '../../utils/constants';

import NotesViewMenu from './NotesViewMenu';


function NotesTopBar(props) {

  const sectionInView = useLocation().state;

  const leftSide = (
    <>
      <Typography variant="h6" noWrap component="div">
        {sectionInView.sectionName}
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