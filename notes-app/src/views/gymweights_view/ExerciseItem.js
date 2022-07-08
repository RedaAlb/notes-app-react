import React, { memo, useContext, useRef, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import exercisesContext from './exercises_context/exercises-context';
import { DELETE_EXERCISE } from './exercises_context/exercises-actions';

import { addExerlog, changeExerciseName } from '../../utils/gym-weights-utils';
import { EXERCISE_ITEM_BG, EXERCISE_ITEM_HEIGHT, EXERCISE_ITEM_PADDING_L } from '../../utils/constants';

import AutoWidthTb from '../../components/AutoWidthTb';
import DragHandle from '../../components/DragHandle';
import ListItem from '../../components/ListItem';
import ConfirmDialog from '../../components/ConfirmDialog';
import Accordion from '../../components/Accordion';
import ExerlogList from './ExerlogList';


function ExerciseItem(props) {
  const exerciseRef = useRef(props.exercise);

  const { dispatch } = useContext(exercisesContext)

  const [delExerciseDiaOpen, setDelExerciseDiaOpen] = useState(false);
  const [forceOpenExerlogs, setForceOpenExerLogs] = useState(false);
  const [insertedExerlog, setInsertedExerlog] = useState({});

  // Needed for re-rendering the exercise count on exerlog insert/delete without re-fetching exercises.
  const [exerciseCount, setExerciseCount] = useState(props.exercise.exerciseCount);


  const onExerciseNameChange = (textboxValue) => {
    exerciseRef.current.exerciseName = textboxValue;
    changeExerciseName(props.exercise, textboxValue);
  }


  const onDelExerciseConfirmed = () => {
    dispatch({ type: DELETE_EXERCISE, payload: exerciseRef.current });
    props.bodypartCountState[0](props.bodypartCountState[1] - 1);
  }


  const onAddExerLogClick = () => {
    addExerlog(exerciseRef.current).then(newExerlog => {
      setInsertedExerlog(newExerlog);
    })

    setForceOpenExerLogs(true);
    setExerciseCount(exerciseCount + 1);
  }


  return (
    <Accordion forceOpen={forceOpenExerlogs}>
      <Accordion.Primary background={EXERCISE_ITEM_BG}>
        <ListItem height={EXERCISE_ITEM_HEIGHT} paddingLeft={EXERCISE_ITEM_PADDING_L}>
          <ListItem.LeftSide>
            <DragHandle
              dragHandleProps={props.provided.dragHandleProps}
              showDragHandle={props.showDragHandle}
            />

            <AutoWidthTb
              value={props.exercise.exerciseName}
              onTextChange={onExerciseNameChange}
              placeholder={"Exercise"}
              minWidth={100}
              fontSize="20px"
            />
          </ListItem.LeftSide>

          <Accordion.Primary.Toggle>
            <ListItem.Middle onClick={() => setForceOpenExerLogs(false)}>
              <div style={{ color: "gray", marginRight: "8px" }}>{exerciseCount}</div>
            </ListItem.Middle>
          </Accordion.Primary.Toggle>

          <ListItem.RightSide>
            <Stack direction="row" spacing={0}>
              <IconButton onClick={onAddExerLogClick}>
                <AddCircleIcon style={{ color: "green", fontSize: "30px" }} />
              </IconButton>

              <IconButton onClick={() => setDelExerciseDiaOpen(true)}>
                <CancelIcon style={{ color: "red", fontSize: "30px" }} />
              </IconButton>

              <ConfirmDialog
                dialogOpen={delExerciseDiaOpen}
                setDialogOpen={setDelExerciseDiaOpen}
                diaTitle={`Delete (${exerciseRef.current.exerciseName}) exercise?`}
                diaText="All exercise logs will be deleted."
                onConfirmed={onDelExerciseConfirmed}
              />
            </Stack>
          </ListItem.RightSide>
        </ListItem>
      </Accordion.Primary>
      <Accordion.Secondary>
        <ExerlogList
          exercise={exerciseRef.current}
          newExerlog={insertedExerlog}
          exerciseCountState={[setExerciseCount, exerciseCount]}
        />
      </Accordion.Secondary>
    </Accordion>
  )
}

export default memo(ExerciseItem);