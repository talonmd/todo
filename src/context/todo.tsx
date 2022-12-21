import React, { createContext, useState, useContext, useEffect } from 'react';

import { getToDos, createToDo, updateToDo, deleteToDo } from '../api/json-placeholder';

import { ToDo } from '../models/ToDo';

export interface ToDoContextProps {
  toDos: ToDo[];
  add: (data: any) => void;
  update: (id: number, data: any) => void;
  remove: (id: number) => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ToDoContext = createContext<ToDoContextProps | null>(null);

interface ToDoProviderProps {
  children: React.ReactNode;
}

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // JSON Placeholder always gives new tasks an id of 201, regardless of what is passed so I am manually incrementing them to prevent duplicate ids
  const [id, setId] = useState(201);

  useEffect(() => {
    (async () => {
      try {
        const response = await getToDos();
        setToDos(response.data.slice(0, 10));
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  const add = async (data: any) => {
    try {
      const response = await createToDo(data);
      setToDos(current => [...current, { ...response.data, id }]);
      setId(current => current + 1);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = async (id: number, data: any) => {
    try {
      // typically would do something with response, but it sends back incorrect dummy data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await updateToDo(id, data);
      setToDos(current => {
        const index = current.findIndex(task => task.id === id);
        return [...current.slice(0, index), { ...current[index], ...data }, ...current.slice(index + 1)];
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteToDo(id);
      setToDos(current => current.filter(task => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <ToDoContext.Provider
      value={{
        toDos,
        add,
        remove,
        update,
        error,
        setError,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

// Export a hook to use the context without a consumer
export const useToDo = () => useContext(ToDoContext);
