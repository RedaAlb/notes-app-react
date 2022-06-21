import React, { memo, useContext } from 'react';

import Typography from '@mui/material/Typography';

import SearchBox from '../../components/SearchBox';
import TopBar from '../../components/TopBar';

import SectionsViewMenu from './SectionsViewMenu';
import { SECTIONS_TOPBAR_BG } from '../../utils/constants';
import { searchSections } from '../../utils/notes-app-utils';

import sectionsContext from './context/sections-context';
import { SET_SECTIONS } from './context/sections-actions';


function SectionsTopBar(props) {
  const { dispatch } = useContext(sectionsContext);


  const searchOnChangeHandler = (searchValue) => {
    searchSections(searchValue).then(filteredSections => {
      dispatch({ type: SET_SECTIONS, payload: filteredSections })
    })
  }


  return (
    <TopBar bgColour={SECTIONS_TOPBAR_BG}>
      <TopBar.LeftSide>
        <Typography variant="h6" noWrap component="div">
          Sections
        </Typography>
      </TopBar.LeftSide>

      <TopBar.RightSide>
        <SearchBox onChangeHandler={searchOnChangeHandler} />
        <SectionsViewMenu
          showDragHandle={props.showDragHandle}
          setShowDragHandle={props.setShowDragHandle}
        />
      </TopBar.RightSide>
    </TopBar>
  )
}

export default memo(SectionsTopBar);