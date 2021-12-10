import React, { useEffect } from 'react';
import TodoInput from './Todo/TodoInput';
import TodoList from './Todo/TodoList';
import styles from "./App.module.css";
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from './stores';
import { reaction } from 'mobx';

function App() {
  const {todos} = useStore();

  useEffect(() => {
    const disposeReaction = reaction(
    () => {
      return {length: todos.list.length, unfinishedTodos: todos.unfinishedTodos};
    },
    (oldValue, newValue) => {
      console.log({ newValue, oldValue }); // oldValue и newValue - это реальный useCase для использования reactions
    }, {
      delay: 1000,
      onError: err => console.log(err.message), // обработка ошибок
    }) // любые действия, которые мы сделаем в течении секунды будут отменены

    return () =>  {
      disposeReaction(); // делаем такую конструкцию, чтобы избежать утечки памяти
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
