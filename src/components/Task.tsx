import { useState } from 'react';
import { ListItem, IconButton, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, Edit } from '@mui/icons-material';

import { useToDo, ToDoContextProps } from '../context/todo';

import { ToDo } from '../models/ToDo';

import TaskDialog from './TaskDialog';

interface TaskProps {
  task: ToDo;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { update } = useToDo() as ToDoContextProps;

  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={() => setOpen(true)}>
            <Edit />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton onClick={() => update(task.id, { completed: !task.completed })}>
          <ListItemIcon>{task.completed ? <CheckBox /> : <CheckBoxOutlineBlank />}</ListItemIcon>
          <ListItemText primary={task.title} sx={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
        </ListItemButton>
      </ListItem>
      <TaskDialog open={open} setOpen={setOpen} editing task={task} />
    </>
  );
};

export default Task;
