import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import WarningIcon from '@mui/icons-material/Warning';

import OptionsMenu from '../../components/OptionsMenu';
import ConfirmDialog from '../../components/ConfirmDialog';

import { delAllGymWeightsTbs } from '../../utils/gym-weights-utils';


function GymWeightsViewMenu(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteDataDiaOpen, setDeleteDataDiaOpen] = useState(false);  // Dia: Dialog


  const onDelGymWeightsConfirmed = () => {
    delAllGymWeightsTbs();
  }


  const onToggleDragHandleClick = () => {
    props.setShowDragHandle(!props.showDragHandle);
    setMenuAnchor(null);
  }


  return (
    <OptionsMenu
      id="gymweights-topbar-options"
      btnContent={<MoreIcon style={{ color: "white" }} />}
      btnSize="large"
      minWidth={250}
      menuAnchor={menuAnchor}
      setMenuAnchor={setMenuAnchor}
    >
      <MenuItem onClick={onToggleDragHandleClick} dense={true}>
        <IconButton size="large" color="inherit"><DragHandleIcon /></IconButton>
        <p>Toggle drag handle</p>
      </MenuItem>

      <MenuItem onClick={() => setDeleteDataDiaOpen(true)} dense={true}>
        <IconButton size="large" color="inherit"><FolderDeleteIcon /></IconButton>
        <p>Delete all gym weights data</p>
      </MenuItem>

      <ConfirmDialog
        dialogOpen={deleteDataDiaOpen}
        setDialogOpen={setDeleteDataDiaOpen}
        diaTitle="Delete ALL gym weights data?"
        diaText="All bodyparts, exercises, and exerlogs will be deleted."
        diaIcon={<WarningIcon sx={{ color: "#ff0000" }} />}
        onConfirmed={onDelGymWeightsConfirmed}
      />
    </OptionsMenu>
  )
}

export default GymWeightsViewMenu;