import React, { useEffect } from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from './stores';
import { when } from 'mobx';

function App() {
  const {todos} = useStore();

  useEffect(() => {
    when(
      () => !appUI.todosVisible, // условие
      () => {
        console.log("clean up!");
      } // реакция
    ) 
  }, [])

  const appUI = useLocalObservable(() => ({
    todosVisible: true,
    loading: false,
    toggleTodoVisibility() {
      this.todosVisible = !this.todosVisible;
    },
  }));

  return (
    <div className="app">
      <TodoInput />
      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={appUI.toggleTodoVisibility}>
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos (unfinished {todos.unfinishedTodos.length})
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default observer(App);
