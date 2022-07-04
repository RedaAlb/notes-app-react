import React, { memo, useContext, useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { IconButton, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

import exerlogsContext from './exerlogs_context/exerlogs-context';
import { DELETE_EXERLOG } from './exerlogs_context/exerlogs-actions';

import { changeExerlogDate, changeExerlogWeight } from '../../utils/gym-weights-utils';
import { EXERLOG_ITEM_BG, EXERLOG_ITEM_HEIGHT, EXERLOG_ITEM_PADDING_L } from '../../utils/constants';

import ConfirmDialog from '../../components/ConfirmDialog';


// These styles are left inside this file since they are specific to the exerlog item and non-reusable.
const FONT_SIZE = "18px";

const exerLogStyle = {
  height: EXERLOG_ITEM_HEIGHT,
  display: "flex",
  alignItems: "center",
  width: "-webkit-fill-available",
  paddingLeft: EXERLOG_ITEM_PADDING_L,
  background: EXERLOG_ITEM_BG
}

const weightInputStyle = {
  height: "inherit",
  border: "none",
  background: "transparent",
  fontSize: FONT_SIZE,
  textAlign: "center",
  minWidth: "80px"
}

const unitStyle = {
  height: "inherit",
  display: "flex",
  alignItems: "center",
  width: "200px",
  fontSize: FONT_SIZE,
}

const leftSideStyle = {
  marginLeft: "auto",
}


function ExerlogItem(props) {
  const { dispatch } = useContext(exerlogsContext);

  const [exerlogWeight, setExerlogWeight] = useState(props.exerlog.exerlogWeight)
  const [delExerlogDiaOpen, setDelExerlogDiaOpen] = useState(false);

  // Converting sql date format to MUI datepicker friendly format.
  const dateTime = props.exerlog.exerlogCreateDate.split(" ");
  const date = dateTime[0].split("-");
  const time = dateTime[1].split(":");

  const dateString = `${date[0]}-${date[1]}-${date[2]}`;
  const timeString = `${time[0]}:${time[1]}:${time[2]}`;

  const dateFormatted = new Date(`${dateString}T${timeString}`);
  const [dateInput, setDateInput] = useState(dateFormatted);


  const padZeros = (string) => {
    return string.toString().padStart(2, "0");
  }


  const onDateChange = (date) => {
    setDateInput(date);

    // Updating db
    const dateSqlFormat = `${date.getFullYear()}-${padZeros(date.getMonth() + 1)}-${padZeros(date.getDate())}`;
    const timeSqlFormat = `${padZeros(date.getHours())}:${padZeros(date.getMinutes())}:${padZeros(date.getSeconds())}`;

    const sqlDateFormat = `${dateSqlFormat} ${timeSqlFormat}`;
    changeExerlogDate(props.exerlog, sqlDateFormat);
  }


  const onWeightChange = (event) => {
    const textboxValue = event.target.value;
    const exerlogWeightInt = parseFloat(textboxValue) || 0;  // Condition is to make NaN = 0

    setExerlogWeight(exerlogWeightInt);
    changeExerlogWeight(props.exerlog, exerlogWeightInt);
  }


  const onDelExerlogConfirmed = () => {
    dispatch({ type: DELETE_EXERLOG, payload: props.exerlog })
    props.exerciseCountState[0](props.exerciseCountState[1] - 1);
  }


  return (
    <div style={exerLogStyle}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateTimePicker
          label=""
          inputFormat="dd/MM/yyyy HH:mm"
          value={dateInput}
          onChange={onDateChange}
          renderInput={(params) =>
            <TextField {...params} size="small" variant="standard" InputProps={{ disableUnderline: true }} />
          }
        />
      </LocalizationProvider>


      <input
        type="number"
        value={exerlogWeight === 0 ? "" : exerlogWeight}
        onChange={onWeightChange}
        placeholder="Weight"
        style={weightInputStyle}
      />

      <div style={unitStyle}>
        Kg
      </div>

      <div style={leftSideStyle}>
        <Stack direction="row">
          <IconButton onClick={() => setDelExerlogDiaOpen(true)}>
            <ClearIcon style={{ fontSize: "30px" }} />
          </IconButton>

          <ConfirmDialog
            dialogOpen={delExerlogDiaOpen}
            setDialogOpen={setDelExerlogDiaOpen}
            diaTitle={"Delete exercise log?"}
            diaText={`${props.exerlog.exerlogCreateDate} | ${exerlogWeight} kg`}
            onConfirmed={onDelExerlogConfirmed}
          />
        </Stack>
      </div>
    </div>
  )
}

export default memo(ExerlogItem);