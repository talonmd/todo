import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

import { useToDo, ToDoContextProps } from '../context/todo';

import { ToDo } from '../models/ToDo';

interface TaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editing?: boolean;
  task?: ToDo;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, setOpen, editing, task }) => {
  const { add, update, setError } = useToDo() as ToDoContextProps;

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editing && task) {
      setTitle(task.title);
    }
  }, [editing, task, open]);

  const createTask = () => {
    add({ userId: 1, title, completed: false });
    closeDialog();
  };

  const updateTask = () => {
    if (!task) {
      setError('Something went wrong');
      closeDialog();
      return;
    }

    update(task.id, { title });
    closeDialog();
  };

  const closeDialog = () => {
    setOpen(false);
    setTitle('');
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>{editing ? 'Update' : 'Create'} Task</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="title" label="Task" type="text" fullWidth variant="standard" value={title} onChange={e => setTitle(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        {editing ? <Button onClick={updateTask}>Update Task</Button> : <Button onClick={createTask}>Create Task</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
