import React from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { observable, runInAction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

function App() {
  const appUI = useLocalObservable(() => observable({
    todosVisible: true,
    loading: false,
    async toggleTodoVisibility() {
      appUI.loading = true;

      await new Promise(resolve => setTimeout(() => resolve(void 0), 1000));

      runInAction(() => {
        appUI.loading = false;
        appUI.todosVisible = !appUI.todosVisible;
      })
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
