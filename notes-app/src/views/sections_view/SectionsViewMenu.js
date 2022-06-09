import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import MoreIcon from '@mui/icons-material/MoreVert';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import WarningIcon from '@mui/icons-material/Warning';

import OptionsMenu from '../../components/OptionsMenu';
import ConfirmDialog from '../../components/ConfirmDialog';
import { deleteSqlDb } from '../../utils/sql';


function SectionsViewMenu(props) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteAllDataDiaOpen, setDeleteAllDataDiaOpen] = useState(false);  // Dia: Dialog


  const onSaveClick = () => {
    console.log("Export");
  }


  const onLoadClick = () => {
    console.log("Import");
  }


  const onDelAllDataConfirmed = () => {
    deleteSqlDb();
    setDeleteAllDataDiaOpen(false);
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

      <MenuItem onClick={onSaveClick} dense={true}>
        <IconButton size="large" color="inherit"><SaveIcon /></IconButton>
        <p>Export</p>
      </MenuItem>

      <MenuItem onClick={onLoadClick} dense={true}>
        <IconButton size="large" color="inherit"><DownloadIcon /></IconButton>
        <p>Import</p>
      </MenuItem>

      <MenuItem onClick={() => setDeleteAllDataDiaOpen(true)} dense={true}>
        <IconButton size="large" color="inherit"><FolderDeleteIcon /></IconButton>
        <p>Delete all data</p>
      </MenuItem>

      <ConfirmDialog
        dialogOpen={deleteAllDataDiaOpen}
        setDialogOpen={setDeleteAllDataDiaOpen}
        diaTitle="Delete ALL data?"
        diaText="All sections and all notes will be deleted."
        diaIcon={<WarningIcon sx={{ color: "#ff0000" }} />}
        onConfirmed={onDelAllDataConfirmed}
      />
    </OptionsMenu>
  )
}

export default SectionsViewMenu;