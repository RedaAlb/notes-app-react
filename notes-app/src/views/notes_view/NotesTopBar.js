import React, { memo, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import SearchBox from '../../components/SearchBox';
import TopBar from '../../components/TopBar';

import { NOTES_TOPBAR_BG } from '../../utils/constants';
import { searchNotes } from '../../utils/notes-app-utils';

import NotesViewMenu from './NotesViewMenu';

import notesContext from './context/notes-context';
import { SET_NOTES } from './context/notes-actions';


function NotesTopBar(props) {
  const { dispatch } = useContext(notesContext);

  const sectionInView = useLocation().state;


  const searchOnChangeHandler = (searchValue) => {
    searchNotes(searchValue, sectionInView.sectionKey).then(filteredNotes => {
      dispatch({ type: SET_NOTES, payload: filteredNotes });
    })
  }


  return (
    <TopBar bgColour={NOTES_TOPBAR_BG}>
      <TopBar.LeftSide>
        <Typography variant="h6" noWrap component="div">
          {sectionInView.sectionName}
        </Typography>
      </TopBar.LeftSide>

      <TopBar.RightSide>
        <SearchBox onChangeHandler={searchOnChangeHandler} />
        <NotesViewMenu />
      </TopBar.RightSide>
    </TopBar>
  )
}

export default memo(NotesTopBar);