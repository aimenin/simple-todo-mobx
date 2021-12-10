import React, { useEffect } from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from './stores';
import { autorun } from 'mobx';

function App() {
  const {todos} = useStore();

  useEffect(() => {
    const disposeAutorun = autorun(() => {
      console.log(todos.list.length);
      throw new Error('new error'); // все ошибки будут выводится только в консоль и не будут прерывать исполнение нашего приложения
    }, {
      delay: 1000,
      onError: err => console.log(err.message), // обработка ошибок
    }) // любые действия, которые мы сделаем в течении секунды будут отменены

    return () =>  {
      disposeAutorun(); // делаем такую конструкцию, чтобы избежать утечки памяти
    }
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
