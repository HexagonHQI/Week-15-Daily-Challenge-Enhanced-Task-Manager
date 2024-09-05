// src/App.js
import React from 'react';
import TaskManager from './TaskManager';
import { TaskProvider } from './TaskContext';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <TaskManager />
      </div>
    </TaskProvider>
  );
}

export default App;
