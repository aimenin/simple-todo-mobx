import { createContext, useContext } from "react";
import TodoStore from "./TodoStore";

const store = {
  todos: new TodoStore(),
} // создаем наш стор, который является объединением всех наших сторов

export const StoreContext = createContext(store); // создаем стандартный контекст реакта

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
} // создаем кастомный хук для нашего стора

export default store;