import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

import { useToDo, ToDoContextProps } from '../context/todo';

interface NewTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ open, setOpen }) => {
  const { add } = useToDo() as ToDoContextProps;

  const [title, setTitle] = useState('');

  const createNewTask = async () => {
    add({ userId: 1, title, completed: false });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="title" label="Task" type="text" fullWidth variant="standard" value={title} onChange={e => setTitle(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={createNewTask}>Create New Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskDialog;
