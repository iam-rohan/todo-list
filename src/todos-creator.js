import { format } from "date-fns";
import { populateStorage, myTodos, sortTodos } from "./storage-handling";
import { landing } from "./ui-handling";

function Todos(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

function createATodo() {
  const title = prompt("Enter Title:");
  const description = prompt("Enter Description:");
  const dueDate = format(new Date(prompt("Enter Due Date:")), "MM/dd/yyyy");
  const priority = prompt("Enter Priority:");

  const newTodo = new Todos(title, description, dueDate, priority);

  myTodos.push(newTodo);
  populateStorage();
  sortTodos();
  landing();
}

export { createATodo };
