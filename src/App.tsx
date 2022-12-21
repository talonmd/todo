import React, { useState } from 'react';
import { Container, Alert, Box, List, Typography, Button } from '@mui/material';

import { useToDo, ToDoContextProps } from './context/todo';

import TaskDialog from './components/TaskDialog';
import Task from './components/Task';

function App() {
  const { toDos, error, setError } = useToDo() as ToDoContextProps;

  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="sm">
      {error ? (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      ) : null}
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
      <TaskDialog open={open} setOpen={setOpen} />
    </Container>
  );
}

export default App;
