import React, { useState } from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

function App() {
  const [appUI] = useState(() => observable({
    todosVisible: true,
    toggleTodoVisibility() {
      this.todosVisible = !this.todosVisible;
    },
  }));

  const handleVisible = () => appUI.toggleTodoVisibility();

  return (
    <div className="app">
      <TodoInput />
      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={handleVisible}>
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default observer(App);
