import { makeAutoObservable } from "mobx";

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

const TodoStore = () => makeAutoObservable({
  list: [] as Todo[],

  add(title: string) {
    if (title.length < 3) {
      return;
    }

    this.list.push({
      id: Date.now(),
      title,
      isDone: false,
    })
  },

  toggle(todo: Todo) {
    todo.isDone = !todo.isDone;
  },

  remove(todo: Todo) {
    this.list = this.list.filter(todoItem => todoItem.id !== todo.id);
  }
}); // функция фабрика

export default TodoStore;