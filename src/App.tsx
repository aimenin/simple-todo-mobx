import React, { useEffect } from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { observable } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

function App() {
  const appUI = useLocalObservable(() => observable({
    todosVisible: true,
    loading: false,
    *toggleTodoVisibility() { // we use generation function to get benefit from cancel operation
      appUI.loading = true;

      yield new Promise(resolve => setTimeout(() => resolve(void 0), 1000));

      appUI.loading = false;
      appUI.todosVisible = !appUI.todosVisible;
    },
  }));

  useEffect(() => {
    console.log({ loading: appUI.loading })
  }, [appUI.loading]); // we can use useEffect with generate functions

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
