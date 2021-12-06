import React from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';

function App() {
  return (
    <div className="app">
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
