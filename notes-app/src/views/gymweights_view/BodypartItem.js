import React, { memo, useContext, useRef, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import bodypartsContext from './bodyparts_context/bodyparts-context';

import { BODYPART_ITEM_HEIGHT } from '../../utils/constants';
import { changeBodypartName } from '../../utils/gym-weights-utils';

import Accordion from '../../components/Accordion';
import AutoWidthTb from '../../components/AutoWidthTb';
import DragHandle from '../../components/DragHandle';
import ListItem from '../../components/ListItem';
import ConfirmDialog from '../../components/ConfirmDialog';
import { DELETE_BODYPART } from './bodyparts_context/bodyparts-actions';


function BodypartItem(props) {
  const bodypartRef = useRef(props.bodypart);

  const { dispatch } = useContext(bodypartsContext);

  const [delBodypartDiaOpen, setDelBodypartDiaOpen] = useState(false);


  const onBodypartNameChange = (textboxValue) => {
    bodypartRef.current.bodypartName = textboxValue;
    changeBodypartName(props.bodypart, textboxValue);
  }


  const onDelBodypartConfirmed = () => {
    dispatch({ type: DELETE_BODYPART, payload: bodypartRef.current })
  }


  return (
    <Accordion>
      <Accordion.Primary>
        <ListItem height={BODYPART_ITEM_HEIGHT}>
          <ListItem.LeftSide>
            <DragHandle
              dragHandleProps={props.provided.dragHandleProps}
              showDragHandle={props.showDragHandle}
            />

            <AutoWidthTb
              value={props.bodypart.bodypartName}
              onTextChange={onBodypartNameChange}
              placeholder={"Bodypart"}
              minWidth={100}
            />
          </ListItem.LeftSide>

          <Accordion.Primary.Toggle>
            <ListItem.Middle>
              <div style={{ color: "gray", marginRight: "8px" }}>{props.bodypart.bodypartCount}</div>
            </ListItem.Middle>
          </Accordion.Primary.Toggle>

          <ListItem.RightSide>
            <Stack direction="row" spacing={0}>
              <IconButton>
                <AddCircleIcon fontSize="large" style={{ color: "green" }} />
              </IconButton>

              <IconButton onClick={() => setDelBodypartDiaOpen(true)}>
                <CancelIcon fontSize="large" style={{ color: "red" }} />
              </IconButton>

              <ConfirmDialog
                dialogOpen={delBodypartDiaOpen}
                setDialogOpen={setDelBodypartDiaOpen}
                diaTitle={`Delete (${bodypartRef.current.bodypartName}) bodypart?`}
                diaText="All exercise logs will be deleted."
                onConfirmed={onDelBodypartConfirmed}
              />

            </Stack>
          </ListItem.RightSide>
        </ListItem>
      </Accordion.Primary>
      <Accordion.Secondary>
        Exercises
      </Accordion.Secondary>
    </Accordion>
  )
}

export default memo(BodypartItem);