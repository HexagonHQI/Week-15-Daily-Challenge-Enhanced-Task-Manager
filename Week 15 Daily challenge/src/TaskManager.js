// src/TaskManager.js
import React from 'react';
import { useTask } from './TaskContext';
import './TaskManager.css';

function TaskManager() {
  const {
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
  } = useTask();

  const handleAddTask = (e) => {
    if (e.key === 'Enter') {
      addTask(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Add a new task"
        onKeyDown={handleAddTask}
      />
      <div className="filters">
        <button onClick={() => filterTasks('all')}>All</button>
        <button onClick={() => filterTasks('completed')}>Completed</button>
        <button onClick={() => filterTasks('active')}>Active</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
            <button onClick={() => {
              setEditText(task.text);
              editRef.current.focus();
              editTask(task.id);
            }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        ref={editRef}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onBlur={() => editTask(editText.id)}
        placeholder="Edit task"
      />
    </div>
  );
}

export default TaskManager;
