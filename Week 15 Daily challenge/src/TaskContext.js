// src/TaskContext.js
import React, { createContext, useReducer, useRef, useState } from 'react';

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.id);
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.id ? { ...task, text: action.text } : task
      );
    case 'FILTER_TASKS':
      return state.filter((task) =>
        action.filter === 'all'
          ? true
          : action.filter === 'completed'
          ? task.completed
          : !task.completed
      );
    default:
      return state;
  }
}

// Create Context
const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [filter, setFilter] = useState('all');
  const [editText, setEditText] = useState('');
  const editRef = useRef(null);

  const addTask = (text) => dispatch({ type: 'ADD_TASK', text });
  const removeTask = (id) => dispatch({ type: 'REMOVE_TASK', id });
  const toggleTask = (id) => dispatch({ type: 'TOGGLE_TASK', id });
  const editTask = (id) => {
    if (editText.trim() === '') return;
    dispatch({ type: 'EDIT_TASK', id, text: editText });
    setEditText('');
    editRef.current.blur();
  };
  const filterTasks = (filter) => {
    setFilter(filter);
    dispatch({ type: 'FILTER_TASKS', filter });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        editText,
        setEditText,
        editRef,
        addTask,
        removeTask,
        toggleTask,
        editTask,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}

export { TaskProvider, useTask };
