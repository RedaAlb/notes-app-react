import React, { useState } from 'react';
import { useSpring } from 'react-spring';

import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import WarningIcon from '@mui/icons-material/Warning';

import TextDivider from '../../components/TextDivider';
import ConfirmDialog from '../../components/ConfirmDialog';
import Animate from '../../components/Animate';

import { deleteSqlDb, exportDb, importDataFromFile } from '../../utils/sql';
import { SETTINGS_ANIM } from '../../utils/constants';

import SettingsItem from './SettingsItem';
import SettingsTopBar from './SettingsTopBar';


function SettingsView(props) {
  const [deleteAllDataDiaOpen, setDeleteAllDataDiaOpen] = useState(false);  // Dia: Dialog

  const animation = useSpring(SETTINGS_ANIM);


  const onPlaceholderClick = (checked) => {
    console.log(checked);
  }


  const onImportClick = () => {
    importDataFromFile();
  }


  const onExportClick = () => {
    exportDb();
  }


  const onDelAllDataConfirmed = () => {
    deleteSqlDb();
    setDeleteAllDataDiaOpen(false);
  }


  return (
    <>
      <SettingsTopBar />

      <Animate animation={animation}>
        <TextDivider text="Placeholder" />
        <SettingsItem text={"Placeholder"} icon={<SaveIcon />} onClick={onPlaceholderClick} switch />

        <TextDivider text="Data" />
        <SettingsItem text={"Export"} icon={<SaveIcon />} onClick={onExportClick} />
        <SettingsItem text={"Import"} icon={<DownloadIcon />} onClick={onImportClick} />
        <SettingsItem text={"Delete all data"} icon={<FolderDeleteIcon />} onClick={() => setDeleteAllDataDiaOpen(true)} />

        <ConfirmDialog
          dialogOpen={deleteAllDataDiaOpen}
          setDialogOpen={setDeleteAllDataDiaOpen}
          diaTitle="Delete ALL data?"
          diaText="All data in the app will be deleted."
          diaIcon={<WarningIcon sx={{ color: "#ff0000" }} />}
          onConfirmed={onDelAllDataConfirmed}
        />
      </Animate>
    </>
  )
}

export default SettingsView;