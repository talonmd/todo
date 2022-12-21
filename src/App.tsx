import React, { useState } from 'react';
import { Container, Box, List, Typography, Button } from '@mui/material';

import { useToDo, ToDoContextProps } from './context/todo';

import NewTaskDialog from './components/NewTaskDialog';
import Task from './components/Task';

function App() {
  const { toDos } = useToDo() as ToDoContextProps;

  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">To Do</Typography>
      <Box>
        <List>
          {toDos.map(task => (
            <Task task={task} key={task.id} />
          ))}
        </List>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create New Task
        </Button>
      </Box>
      <NewTaskDialog open={open} setOpen={setOpen} />
    </Container>
  );
}

export default App;
