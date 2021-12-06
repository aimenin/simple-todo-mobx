import React, { useState } from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";

function App() {
  const [todosVisible, setTodosVisible] = useState(true);

  const handleVisible = () => setTodosVisible(state => !state);

  return (
    <div className="app">
      <TodoInput />
      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={handleVisible}>
          <span>{todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default App;
