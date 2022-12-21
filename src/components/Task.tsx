import { ListItem, IconButton, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, Edit } from '@mui/icons-material';

import { useToDo, ToDoContextProps } from '../context/todo';

import { ToDo } from '../models/ToDo';

interface TaskProps {
  task: ToDo;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { update, remove } = useToDo() as ToDoContextProps;

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => remove(task.id)}>
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
  );
};

export default Task;
