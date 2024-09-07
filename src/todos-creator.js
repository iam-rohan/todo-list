import { format } from "date-fns";
import { populateStorage, myTodos, sortTodos } from "./storage-handling";

function Todos(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

function createATodo(title, description, dueDate, priority) {
  const newTodo = new Todos(title, description, dueDate, priority);

  myTodos.push(newTodo);
  populateStorage();
  sortTodos();
}

export { createATodo };
