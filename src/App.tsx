import React from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { action, observable } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

function App() {
  const appUI = useLocalObservable(() => observable({
    todosVisible: true,
    loading: false,
    toggleTodoVisibility() {
      appUI.loading = true;

      new Promise(resolve => setTimeout(() => resolve(void 0), 1000))
        .then(action(() => {
          appUI.loading = false;
          appUI.todosVisible = !appUI.todosVisible;
        }));
      appUI.todosVisible = !appUI.todosVisible;
    },
  }));

  return (
    <div className="app">
      <TodoInput />
      {String(appUI.loading)}
      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={appUI.toggleTodoVisibility}>
          <span>{appUI.todosVisible ? "-" : "+"}</span>
          Todos
        </h2>
        {appUI.todosVisible && <TodoList />}
      </div>
    </div>
  );
}

export default observer(App);
