import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import WarningIcon from '@mui/icons-material/Warning';

import OptionsMenu from '../../components/OptionsMenu';
import ConfirmDialog from '../../components/ConfirmDialog';

import { delAllSectionsNotesTbs } from '../../utils/notes-app-utils';


function SectionsViewMenu(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteAllDataDiaOpen, setDeleteAllDataDiaOpen] = useState(false);  // Dia: Dialog


  const onDelAllNotesConfirmed = () => {
    delAllSectionsNotesTbs();
  }


  const onToggleDragHandleClick = () => {
    props.setShowDragHandle(!props.showDragHandle);
    setMenuAnchor(null);
  }


  return (
    <OptionsMenu
      id="sections-topbar-options"
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

      <MenuItem onClick={() => setDeleteAllDataDiaOpen(true)} dense={true}>
        <IconButton size="large" color="inherit"><FolderDeleteIcon /></IconButton>
        <p>Delete all sections</p>
      </MenuItem>

      <ConfirmDialog
        dialogOpen={deleteAllDataDiaOpen}
        setDialogOpen={setDeleteAllDataDiaOpen}
        diaTitle="Delete ALL notes data?"
        diaText="All sections and all notes will be deleted."
        diaIcon={<WarningIcon sx={{ color: "#ff0000" }} />}
        onConfirmed={onDelAllNotesConfirmed}
      />
    </OptionsMenu>
  )
}

export default SectionsViewMenu;