import React from 'react';

import { Typography } from '@mui/material';

import TopBar from '../../components/TopBar';
import SearchBox from '../../components/SearchBox';

import GymWeightsViewMenu from './GymWeightsViewMenu';
import { GYMWEIGHTS_TOPBAR_BG } from '../../utils/constants';


function GymWeightsTopBar(props) {

  const searchOnChangeHandler = (searchValue) => {
    console.log(searchValue);
    // searchSections(searchValue).then(filteredSections => {
    //   dispatch({ type: SET_SECTIONS, payload: filteredSections })
    // })
  }


  return (
    <TopBar bgColour={GYMWEIGHTS_TOPBAR_BG}>
      <TopBar.LeftSide>
        <Typography variant="h6" noWrap component="div">
          Gym weights log
        </Typography>
      </TopBar.LeftSide>

      <TopBar.RightSide>
        <SearchBox onChangeHandler={searchOnChangeHandler} />
        <GymWeightsViewMenu
          showDragHandle={props.showDragHandle}
          setShowDragHandle={props.setShowDragHandle}
        />
      </TopBar.RightSide>
    </TopBar>
  )
}

export default GymWeightsTopBar;